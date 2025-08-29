import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loaderOrderId, setLoaderOrderId] = useState(null);
  const [filter, setFilter] = useState("all"); // State to manage filter selection
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  async function handleFetchOrderDetails(getId) {
    setLoaderOrderId(getId);
    await dispatch(getOrderDetailsForAdmin(getId)).unwrap();
    setLoaderOrderId(null);
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const filterOrders = (orders) => {
    const today = new Date();
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);

      switch (filter) {
        case "last7days":
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(today.getDate() - 7);
          return orderDate >= sevenDaysAgo;
        case "thisMonth":
          return (
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
          );
        case "lastMonth":
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          return (
            orderDate.getMonth() === lastMonth.getMonth() &&
            orderDate.getFullYear() === lastMonth.getFullYear()
          );
        default:
          return true; // No filter, return all orders
      }
    });

    return filteredOrders;
  };

  const sortedOrderList = filterOrders(orderList).sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  const totalOrders = sortedOrderList.length; // Get total number of filtered orders

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Orders</CardTitle>
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 p-2 border rounded border border-gray-500"
          >
            <option value="all">All Orders</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Display Total Orders */}
        <div className="mb-4">
          <strong>Total Orders: </strong>
          {totalOrders}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrderList && sortedOrderList.length > 0
              ? sortedOrderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                          orderItem.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : orderItem.orderStatus === "inShipping"
                            ? "bg-blue-100 text-blue-700"
                            : orderItem.orderStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {orderItem.orderStatus.charAt(0).toUpperCase() +
                          orderItem.orderStatus.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        {loaderOrderId === orderItem?._id
                          ? "fetching... "
                          : "View Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
      {openDetailsDialog && !loaderOrderId && (
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <AdminOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      )}
    </Card>
  );
}

export default AdminOrdersView;
