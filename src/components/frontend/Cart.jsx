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
        .catch((error) => {});
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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cart_id
          ? {
              ...item,
              product_quantity:
                item.product_quantity > 1 ? item.product_quantity - 1 : 1,
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
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        cart_id === item.id
          ? { ...item, product_quantity: item.product_quantity + 1 }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  const token = localStorage.getItem("auth_token");

  const updateCartQuantity = (cart_id, scope) => {
    if (token) {
      AxiosInstance.put(`/api/update-cart/${cart_id}/${scope}`).catch((err) =>
        console.log(err)
      );
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const updatedCart = cart.map((item) => {
        if (item.id === cart_id) {
          let newQty = item.product_quantity;
          if (scope === "inc" && newQty < 10) {
            newQty += 1;
          } else if (scope === "dec" && newQty > 1) {
            newQty -= 1;
          }
          return { ...item, product_quantity: newQty };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();
    const thisclicked = e.currentTarget;

    if (token) {
      AxiosInstance.delete(`/api/delete-cart/${cart_id}`)
        .then((response) => {
          if (response.status === 200) {
            thisclicked.closest("tr").remove();
            alertify.set("notifier", "position", "top-right");
            alertify.success("item removed from cart");
            navigate(0);
          }
        })
        .catch((error) => console.log(error));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((item) => item.id !== cart_id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      alertify.set("notifier", "position", "top-right");
      alertify.success("Item removed from cart");
      navigate(0);
    }
  };

  let cartDetails = [];

  if (loading) {
    return <p className="m-3">Loading cart details...</p>;
  } else {
    if (cartItems.length > 0) {
      cartDetails = cartItems.map((item, id) => {
        totalPrice += item.product_price * item.product_quantity;

        return (
          <tr key={id}>
            <td width="10%" className="text-center">
              <img
                src={`https://laravel-api-production-1d4a.up.railway.app/${item.product_image}`}
                width="80px"
                height="55px"
                className="border-3"
                alt={item.product_name}
              />
            </td>
            <td width="10%" className="text-center">
              <h6>${item.product_name}</h6>
            </td>
            <td width="10%" className="text-center">
              <h6>${item.product_price}</h6>
            </td>
            <td width="5%">
              <div className="d-flex flex-column align-items-center gap-1 responsive-quantity">
                <button
                  type="button"
                  className="btn btn-outline-secondary py-1 px-2"
                  onClick={() => handleIncreament(item.id)}
                >
                  +
                </button>

                <div
                  className="form-control text-center p-1"
                  style={{ width: "2.5rem", fontSize: "0.9rem" }}
                >
                  {item.product_quantity}
                </div>

                <button
                  type="button"
                  className="btn btn-outline-secondary py-1 px-2"
                  onClick={() => handleDecreament(item.id)}
                >
                  -
                </button>
              </div>
            </td>
            <td width="15%" className="text-center">
              <h6>
                ${(item.product_price * item.product_quantity).toFixed(2)}
              </h6>
            </td>
            <td width="8%" className="text-center">
              <button
                className="remove-cart btn btn-sm btn-danger"
                onClick={(e) => deleteCartItem(e, item.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      });
    } else {
      cartDetails = (
        <div>
          <span>Your cart is empty</span>
        </div>
      );
    }
  }

  const formattedPrice = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="">
      <div className="py-3 bg-warning">
        <div className="container d-flex align-items-center ms-auto">
          <h5>Cart</h5>
          <i className="bi bi-cart mb-1 p-2"></i>
        </div>
      </div>

      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>{cartDetails}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="card card-body mt-3">
            <h5>
              Total:
              <span className="float-end">{formattedPrice}</span>
            </h5>
            <hr />
            <div className="d-flex">
              <Link to="/checkout" className="btn btn-success ms-auto">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .responsive-quantity {
          min-height: 120px;
        }

        @media (max-width: 576px) {
          .responsive-quantity button,
          .responsive-quantity .form-control {
            width: 2.2rem;
            font-size: 0.8rem;
          }

          .responsive-quantity {
            gap: 0.3rem;
          }

          table thead {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
