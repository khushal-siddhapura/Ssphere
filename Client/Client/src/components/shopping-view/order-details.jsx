import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllComplaints } from "@/store/admin/complaintSlice";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { complaintList, complaintDetails, loading } = useSelector(
    (state) => state.adminComplaint
  );

  //  async function handleFetchComplaintDetails(getId) {
  //     await dispatch(fetchComplaintById(getId)).unwrap();
  //   }

  useEffect(() => {
    dispatch(fetchAllComplaints());
  }, []);

  const handleReport = (orderId) => {
    navigate(`/complaint/${orderId}`);
  };
  const isDelivered = orderDetails?.orderStatus === "delivered";
  const complaint = complaintList.find((complaint) => complaint.orderId === orderDetails?._id);
  const isAlreadyComplaint = complaint?.orderId === orderDetails?._id;

  return (
    <DialogContent
      style={{
        width: "700px",
        height: "600px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <DialogTitle>Order Invoice</DialogTitle>
      <DialogDescription>
        View order details including items, shipping info, and status
      </DialogDescription>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                  orderDetails.orderStatus === "delivered"
                    ? "bg-green-100 text-green-700"
                    : orderDetails.orderStatus === "inShipping"
                    ? "bg-blue-100 text-blue-700"
                    : orderDetails.orderStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : orderDetails.orderStatus === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {orderDetails.orderStatus.charAt(0).toUpperCase() +
                  orderDetails.orderStatus.slice(1)}
              </span>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => handleReport(orderDetails?._id)}
          disabled={!isDelivered || isAlreadyComplaint}
        >
          {isAlreadyComplaint
            ? "Your complaint has already been assigned!"
            : "Report a Problem"}
        </Button>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
