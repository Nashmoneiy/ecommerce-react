import React, { useEffect, useState } from "react";
import alertify from "alertifyjs";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import AxiosInstance from "../../AxiosInstance";

const Cart = () => {
  const { updateCartCount } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let totalPrice = 0;

  useEffect(() => {
    document.title = "Cart";
    const token = localStorage.getItem("auth_token");
    if (token) {
      AxiosInstance.get("/api/cart")
        .then((response) => {
          if (response.status === 200) {
            setCartItems(response.data.data);
            setLoading(false);
          }
        })
        .catch(() => {});
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
          setLoading(false);
        } catch (err) {}
      }
    }
  }, []);

  const handleDecreament = (cart_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cart_id
          ? {
              ...item,
              product_quantity: Math.max(1, item.product_quantity - 1),
            }
          : item
      )
    );
    const item = cartItems.find((item) => item.id === cart_id);
    if (item?.product_quantity > 1) {
      updateCartQuantity(cart_id, "dec");
    }
  };

  const handleIncreament = (cart_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cart_id
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  const updateCartQuantity = (cart_id, scope) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      AxiosInstance.put(`/api/update-cart/${cart_id}/${scope}`).catch(
        console.log
      );
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updated = cart.map((item) => {
        if (item.id === cart_id) {
          let qty = item.product_quantity;
          if (scope === "inc" && qty < 10) qty += 1;
          if (scope === "dec" && qty > 1) qty -= 1;
          return { ...item, product_quantity: qty };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
    }
  };

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    const clicked = e.currentTarget;
    const token = localStorage.getItem("auth_token");
    if (token) {
      AxiosInstance.delete(`/api/delete-cart/${cart_id}`).then((res) => {
        if (res.status === 200) {
          clicked.closest("tr").remove();
          alertify.set("notifier", "position", "top-right");
          alertify.success("item removed from cart");
          navigate(0);
        }
      });
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updated = cart.filter((item) => item.id !== cart_id);
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Item removed from cart");
      navigate(0);
    }
  };

  const cartDetails = cartItems.map((item, id) => {
    totalPrice += item.product_price * item.product_quantity;
    return (
      <tr key={id}>
        <td className="text-center">
          <img
            src={`https://laravel-api-production-1d4a.up.railway.app/${item.product_image}`}
            width="80"
            height="55"
            className="border"
            alt="Product"
          />
        </td>
        <td className="text-center">
          <h6>{item.product_name}</h6>
        </td>
        <td className="text-center">
          <h6>${item.product_price}</h6>
        </td>
        <td>
          <div className="d-flex align-items-center justify-content-start gap-2 flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-secondary py-1 px-2"
              onClick={() => handleDecreament(item.id)}
            >
              -
            </button>
            <div
              className="form-control text-center px-2"
              style={{ width: "3rem", fontSize: "0.9rem" }}
            >
              {item.product_quantity}
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary py-1 px-2"
              onClick={() => handleIncreament(item.id)}
            >
              +
            </button>
          </div>
        </td>
        <td className="text-center">
          <h6>${(item.product_price * item.product_quantity).toFixed(2)}</h6>
        </td>
        <td className="text-center">
          <button
            className="remove-cart"
            onClick={(e) => deleteCartItem(e, item.id)}
          >
            remove
          </button>
        </td>
      </tr>
    );
  });

  const formattedPrice = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="cart">
      <div className="py-3 bg-warning">
        <div className="container d-flex align-items-center">
          <h5 className="mb-0">Cart</h5>
          <i className="bi bi-cart mb-1 p-2"></i>
        </div>
      </div>

      <div className="container mt-3">
        {loading ? (
          <p className="m-3">Loading cart details...</p>
        ) : cartItems.length > 0 ? (
          <>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{cartDetails}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-md-6 col-lg-4">
                <div className="card card-body mt-3">
                  <h5 className="d-flex justify-content-between">
                    Total:
                    <span>{formattedPrice}</span>
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Link to="/checkout" className="btn btn-success">
                      Proceed to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">Your cart is empty</div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .table-responsive {
            overflow-x: auto;
          }

          .table {
            min-width: 600px;
          }

          .cart img {
            max-width: 100%;
            height: auto;
          }

          .cart td {
            white-space: nowrap;
          }

          .cart .btn, .cart .form-control {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
