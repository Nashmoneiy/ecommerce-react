import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AxiosInstance from "../../axiosInstance";
import { useState } from "react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const reference = params.get("reference");
    const token = localStorage.getItem("auth_token");

    if (reference) {
      AxiosInstance.get(`/api/verify-transaction/${reference}`)
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response.data.status);
            setMessage("✅ Payment successful! Thank you for your order.");

            if (token) {
              AxiosInstance.get("/api/clear-cart");
            } else {
              localStorage.removeItem("cart");
            }
          } else {
            setMessage("⚠️ Payment failed or not verified.");
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="m-5">
      <div className="container">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="text-center mt-10">
                <h5 className="text-2xl font-bold">{message}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
