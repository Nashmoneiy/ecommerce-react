import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orderdetails from "./Orderdetails";
import AxiosInstance from "./AxiosInstance";

function Profiles() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("/api/admin/orders")
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
        }
        //console.log(response);
      })
      .catch((error) => {
        /// console.log(error);
      });
  }, []);

  const viewOrder = (e, id) => {
    e.preventDefault();
    const thisclicked = e.currentTarget;
    // thisclicked.innerText = "removing";
    navigate(`${id}`);
  };

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Reference Number</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>{order.reference}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.status}</td>
                    <td>
                      <Orderdetails orderId={order.id} />
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
