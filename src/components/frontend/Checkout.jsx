import React from "react";
import { useState, useEffect } from "react";
axiosInstance;
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";

const Checkout = () => {
  const navigate = useNavigate();
  const [InputErrorList, setInputErrorList] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  var totalPrice = 0;

  const [checkoutInput, setCheckout] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    street: "",
    district: "",
    city: "",
    state: "",
  });
  const handleInput = (e) => {
    e.persist();
    setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
    setInputErrorList({
      firstname: "",
      surname: "",
      email: "",
      phone: "",
      street: "",
      district: "",
      city: "",
      state: "",
    });
    return;
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      AxiosInstance.get("/api/cart")
        .then((response) => {
          if (response.status === 200) {
            setCartItems(response.data.data);
            // setLoading(false);

            // console.log(cartItems);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            // console.log(error);
          }
        });
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
          setLoading(false);
        } catch (err) {
          //  console.error("Error parsing local cart:", err);
        }
      }
    }
  }, []);

  const submitOrder = async (e) => {
    // console.log(cartItems);
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const token = localStorage.getItem("auth_token");
    const orderData = {
      user_type: token ? "authenticated" : "guest",

      firstname: checkoutInput.firstname,
      surname: checkoutInput.surname,
      email: checkoutInput.email,
      phone: checkoutInput.phone,
      street: checkoutInput.street,
      district: checkoutInput.district,
      city: checkoutInput.city,
      state: checkoutInput.state,
      total: totalPrice,
      items: cartItems.map((item, id) => ({
        order_id: item.id,
        product_id: item.prod_id,
        quantity: item.product_quantity,
        price: item.product_price,
      })),
    };

    try {
      const response = await AxiosInstance.post("/api/checkout", orderData);
      if (response.status === 200 || response.status === 201) {
        //alert("Order placed successfully!");
        setInputErrorList({
          firstname: "",
          surname: "",
          email: "",
          phone: "",
          street: "",
          district: "",
          city: "",
          state: "",
        });
        //const popup = new PaystackPop();
        window.location.href = `https://checkout.paystack.com/${response.data.access_code}`;
        setLoading(false);

        // console.log(response.data.access_code);
        // console.log(response.data.reference);
        // setReference(response.data.reference);

        // Clear cart after success
        if (token) {
          AxiosInstance.get("/api/clear-cart")
            .then((response) => {
              if (response.status === 200) {
                // console.log(response);
              }
            })
            .catch((error) => {
              // console.error(error);
            });
        } else {
          // localStorage.removeItem("cart");
        }

        // Reset form and cart state
        setCheckout({
          firstname: "",
          surname: "",
          email: "",
          phone: "",
          street: "",
          district: "",
          city: "",
          state: "",
        });

        setCartItems([]);
      }

      // setLoading(false);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 422) {
        console.error(error.response.data.errors);
        setInputErrorList(error.response.data.errors);
      }
    }
  };

  var cartHtml = [];
  var button = [];
  if (cartItems.length > 0) {
    button = (
      <div>
        <div className="col-12 text-end">
          <div className="form-group mb-3">
            <div className="form-group text-end">
              <button
                variant="primary"
                disabled={loading}
                className="btn btn-dark"
                onClick={submitOrder}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Procedd to pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    cartHtml = cartItems.map((item, id) => {
      totalPrice += item.product_price * item.product_quantity;
      let formattedPrice = totalPrice.toFixed(2);
      return (
        <tr key={item.id}>
          <td width="30%">
            <img
              src={`https://laravel-api-production-1878.up.railway.app/${item.product_image}`}
              className="w-50"
            />
          </td>
          <td>{item.product_name}</td>
          <td>${item.product_price}</td>
          <td>{item.product_quantity} unit(s)</td>
        </tr>
      );
    });
  } else {
    <div>
      <p>your cart is empty</p>
    </div>;
  }
  const formattedPrice = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h5>Checkout</h5>
        </div>
      </div>

      <div className="col-md-5 p-4">
        <table className="table  table-striped">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{cartHtml}</tbody>
          <tfoot>
            <tr>
              <td colSpan="100%">
                <div className="text-end bg-light p-2">
                  <h6 className="m-0">{formattedPrice}</h6>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h6>Basic information</h6>
                </div>
                <div className="card-body " style={{ backgroundColor: "#eee" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Firstname</label>
                        <input
                          type="text"
                          name="firstname"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.firstname}
                        />
                        <span className="text-danger">
                          {InputErrorList.firstname}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Surname</label>
                        <input
                          type="text"
                          name="surname"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.surname}
                        />
                        <span className="text-danger">
                          {InputErrorList.surname}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Email</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.email}
                        />
                        <span className="text-danger">
                          {InputErrorList.email}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.phone}
                        />
                        <span className="text-danger">
                          {InputErrorList.phone}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">Street</label>
                        <input
                          type="text"
                          name="street"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.street}
                        />
                        <span className="text-danger">
                          {InputErrorList.street}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">District (optional)</label>
                        <input
                          type="text"
                          name="district"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.district}
                        />
                        <span className="text-danger">
                          {InputErrorList.district}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.city}
                        />
                        <span className="text-danger">
                          {InputErrorList.city}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="">State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control border-2"
                          onChange={handleInput}
                          value={checkoutInput.state}
                        />
                        <span className="text-danger">
                          {InputErrorList.state}
                        </span>
                      </div>
                    </div>
                    {button}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
