import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (!paymentId || !payerId) {
      console.error("Payment or Payer ID is missing");
      return;
    }

    const orderId = sessionStorage.getItem("currentOrderId");
    if (!orderId) {
      console.error("Order ID is missing from sessionStorage");
      window.location.href = "/shop/error"; // Redirect to error page
      return;
    }

    dispatch(capturePayment({ paymentId, payerId, orderId }))
      .then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = `/shop/payment-success/${orderId}`;
        } else {
          sessionStorage.removeItem("currentOrderId"); // Clean up
          window.location.href = "/shop/payment-failure"; // Redirect to failure page
        }
      })
      .catch((error) => {
        sessionStorage.removeItem("currentOrderId"); // Clean up
        window.location.href = "/shop/payment-failure"; // Redirect to a failure page
      });
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
