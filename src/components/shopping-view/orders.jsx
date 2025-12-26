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
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loaderOrderId, setLoaderOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  async function handleFetchOrderDetails(getId) {
    setLoaderOrderId(getId);
    await dispatch(getOrderDetails(getId)).unwrap();
    setLoaderOrderId(null);
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const sortedCustomerOrders = [...orderList].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
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
            {sortedCustomerOrders && sortedCustomerOrders.length > 0 ? (
              sortedCustomerOrders.map((orderItem) => (
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
                      {loaderOrderId === orderItem?.id
                        ? "fetching... "
                        : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-lg">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {openDetailsDialog && orderDetails && (
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      )}
    </Card>
  );
}

export default ShoppingOrders;
