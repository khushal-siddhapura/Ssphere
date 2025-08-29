import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

function PaypalCancelPage() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const paymentId = params.get("paymentId");
  // const payerId = params.get("PayerID");

  useEffect(() => {
    // if (paymentId && payerId) {
    //   console.log("paymentId==>>>", paymentId)
    //   const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    //   dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
    //     if (data?.payload?.success) {
    //       sessionStorage.removeItem("currentOrderId");
    //       window.location.href = "/shop/payment-success";
    //     }
    //   });
    // }
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center min-h-[250px]">
          <CardTitle className="text-center text-red-500 flex flex-col">
            Oops! Unfortunately your payment was not processed
           <p className="mt-4"> Can you please try again!</p>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

export default PaypalCancelPage;
