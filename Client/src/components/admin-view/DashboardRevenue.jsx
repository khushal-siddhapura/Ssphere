import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";

const DashboardRevenue = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrder);

  const [filter, setFilter] = useState("last7days");

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const filterOrders = () => {
    const now = new Date();
    return orderList.filter(order => {
      const orderDate = new Date(order.orderDate);
      if (filter === "last7days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return orderDate >= sevenDaysAgo;
      }
      return true;
    });
  };

  const filteredOrders = filterOrders();
  const revenueByDay = filteredOrders.filter(order => order.paymentStatus === "paid").reduce((acc, order) => {
    const date = new Date(order.orderDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.totalAmount;
    return acc;
  }, {});

  const chartData = Object.keys(revenueByDay).map(date => ({
    date,
    revenue: revenueByDay[date],
  }));

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardRevenue;
