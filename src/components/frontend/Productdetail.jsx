import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alertify from "alertifyjs";
import { useCart } from "../../CartContext";
import AxiosInstance from "../../AxiosInstance";
const Productdetail = () => {
  const { updateCartCount } = useCart();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [product, setProduct] = useState({});
  const { category_slug, product_slug } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    AxiosInstance.get(`/api/collection/${category_slug}/${product_slug}`)
      .then((response) => {
        setLoading(false);
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [category_slug, product_slug]);

  const handleDecreament = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncreament = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  const addToCart = (e) => {
    e.preventDefault();
    setLoadings(true);

    // simulate API call
    setTimeout(() => {
      setLoadings(false);
    }, 2000);
    const token = localStorage.getItem("auth_token");
    if (token) {
      const formData = new FormData();
      formData.append("image", product.image);
      formData.append("product_id", product.id);
      formData.append("product_quantity", quantity);
      formData.append("product_name", product.name);
      formData.append("product_price", product.selling_price);

      // Assuming product.image is a File object (e.g. from a file input)

      AxiosInstance.post("/api/add-to-cart", formData)
        .then((response) => {
          alertify.set("notifier", "position", "top-right");
          alertify.success(response.data.message);
          updateCartCount();
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const newId =
        cart.length > 0 ? Math.max(...cart.map((item) => item.id)) + 1 : 1;

      const cartItem = {
        id: newId,
        prod_id: product.id,
        product_name: product.name,
        product_quantity: quantity,
        product_price: product.selling_price,
        product_image: product.image,
      };

      const existingIndex = cart.findIndex(
        (item) => item.prod_id === product.id
      );

      if (existingIndex !== -1) {
        alertify.set("notifier", "position", "top-right");
        alertify.success("already added to cart");
      } else {
        cart.push(cartItem);
        // console.log("Added new product to cart.");
        alertify.set("notifier", "position", "top-right");
        alertify.success("added to cart");
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  };

  if (loading) {
    return <p className="m-3">Loading product details...</p>;
  } else {
    var availableProduct = [];
    if (product.quantity > 0) {
      availableProduct = (
        <div>
          <label className="btn-sm bg-success px-4 mt-2 instock">
            In stock
          </label>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  className="input-group-text border-2"
                  onClick={handleDecreament}
                >
                  -
                </button>

                <div className="form-control text-center w-50 border-2">
                  {quantity}
                </div>
                <button
                  type="button"
                  className="input-group-text border-2"
                  onClick={handleIncreament}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                className="btn btn-dark w-100"
                onClick={addToCart}
                variant="primary"
                disabled={loadings}
              >
                {" "}
                {loadings ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      availableProduct = (
        <div>
          <label className="btn-sm bg-danger px-4 mt-2 instock">
            out of stock
          </label>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h4>Product details</h4>
        </div>
      </div>
      <div className="py-3 m-4">
        <div className="container">
          <div className="row" key={product.id}>
            <div className="col-md-4 border-end">
              <img
                src={`https://laravel-api-production-1878.up.railway.app/${product.image}`}
                className="w-100"
                alt={product.name}
              />
            </div>
            <div className="col-md-8">
              <h4 className="name text">
                {product.name}
                <span className="float-end badge btn-sm btn-danger badge-pill">
                  {product.brand}
                </span>
              </h4>
              <p>{product.description}</p>
              <h5 className="mb-1">
                ${product.original_price}
                <s className="ms-2"> ${product.selling_price}</s>
              </h5>
              ⭐⭐⭐
              <div>{availableProduct}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
