import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrderDetails } from "@/store/shop/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, Package, CreditCard, MapPin } from "lucide-react";

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

  const calculateEstimatedDelivery = (orderDatee) => {
    const orderDate = new Date(orderDatee);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Success Header */}
      <div className="text-center mb-10">
        <CheckCircle2 className="mx-auto w-16 h-16 text-emerald-600 mb-4" />
        <h1 className="text-3xl font-bold text-emerald-700">
          Order Confirmed 🎉
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      {orderDetails && (
        <div className="space-y-8">
          {/* Delivery Estimate + Order Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-emerald-700 font-medium">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(orderDetails.orderDate)}
              </p>
              <div className="text-sm text-gray-600">
                <p>
                  Order Date:{" "}
                  {new Date(orderDetails.orderDate).toLocaleDateString()}
                </p>
                <p className="font-semibold">Order ID: {orderDetails._id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Items in Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              {orderDetails?.cartItems?.length > 0 ? (
                <div className="divide-y">
                  {orderDetails.cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-800">${item.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No items in order</p>
              )}
            </CardContent>
          </Card>

          {/* Payment + Delivery */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">PayPal</p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-1">
                <p>
                  {orderDetails?.addressInfo?.address || "No address provided"}
                </p>
                <p>
                  {orderDetails?.addressInfo?.city},{" "}
                  {orderDetails?.addressInfo?.pincode}
                </p>
                <p>{orderDetails?.addressInfo?.phone}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Button */}
      <div className="mt-10">
        <Button
          className="w-full md:w-auto px-8 py-2 text-lg"
          onClick={() => navigate("/shop/account")}
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
