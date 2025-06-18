import React from "react";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../AxiosInstance";
axiosInstance;

function Orderdetails({ orderId }) {
  console.log(orderId);

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (!show) return;

    setLoading(true);
    AxiosInstance.get(`/api/admin/order-details/${orderId}`)
      .then((response) => {
        if (response.status === 200) {
          setOrderItems(response.data.data.order_items);
          console.log(response.data.data.order_items);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [orderId, show]);

  var orderDetail = [];
  if (orderItems.length > 0) {
    orderDetail = orderItems.map((item) => {});
  }

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleShow}>
        View
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            {loading ? (
              <p>Loading...</p>
            ) : orderItems.length === 0 ? (
              <p>No items found in this order.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="border rounded p-3 shadow-sm">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-1">{item.product?.name}</h6>
                        <small className="text-muted">
                          Quantity: {item.product_quantity}
                        </small>
                      </div>
                      <div className="text-end">
                        <p className="mb-0">₦{item.product_price}</p>
                        <strong>
                          ₦{item.product_price * item.product_quantity}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Orderdetails;
