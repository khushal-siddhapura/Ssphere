import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderDetails } from "@/store/shop/order-slice";
import { useDispatch, useSelector } from "react-redux";

function PaymentSuccessPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.shopOrder?.orderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  console.log("Order Details", orderDetails);
  //if (loading) return <div>Loading order details...</div>;
  //if (error) return <div>Error fetching order details</div>;

  const calculateEstimatedDelivery = (orderDatee) => {
    const orderDate = new Date(orderDatee);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white flex flex-col">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
         Order confirmed. 🎉
        <p className="text-4xl">Thank you for your purchase.</p>
      </h1>

      {orderDetails && (
        <div className="p-6 rounded-lg border">
          <div className="flex flex-col gap-2 justify-between mb-20">
            {/* Estimate Delivery */}
            <div>
              <p className="text-emerald-700 text-xl">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(orderDetails.orderDate)}
              </p>
            </div>

            {/* Order Id And Date */}
            <div>
              <p className="text-gray-500">
                Order date:{" "}
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </p>
              <h2 className="text-sm font-semibold">
                Order id: {orderDetails._id}
              </h2>
            </div>
          </div>
          {/* Order Items */}
          <div className="mb-20">
            {orderDetails?.cartItems?.length > 0 ? (
              orderDetails.cartItems.map((item) => (
                <div key={item.productId} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold">{item.title}</h4>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md">$ {item.price}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}{" "}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in order</p>
            )}
          </div>
          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {orderDetails?.addressInfo?.address || "No address provided"}
              </p>
              <p className="text-gray-600">
                {orderDetails?.addressInfo?.city}, ,{" "}
                {orderDetails?.addressInfo?.pincode}
              </p>
              <p className="text-gray-600">
                {orderDetails?.addressInfo?.phone}
              </p>
            </div>
          </div>
        </div>
      )}
      <Button className="mt-5 w-full" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </div>
  );
}

export default PaymentSuccessPage;
