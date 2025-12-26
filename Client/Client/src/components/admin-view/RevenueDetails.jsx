import { useEffect, useState } from "react";
import { DollarSign, CheckCircle, ShoppingBag } from "lucide-react";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ComplaintDataCard from "./ComplaintDataCard";
import TopProductsTable from "./TopProductsTab";
import { fetchAllComplaints } from "@/store/admin/complaintSlice";
import { fetchTopProducts } from "@/store/admin/topProductSlice";
import CategoryChart from "./CategoryChart";

const RevenueDetails = () => {
  const [filter, setFilter] = useState("last7days");
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
    dispatch(fetchAllComplaints());
    dispatch(fetchTopProducts());
  }, []);

  const filterOrders = () => {
    const now = new Date();
    return orderList.filter((order) => {
      const orderDate = new Date(order.orderDate);
      if (filter === "last7days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return orderDate >= sevenDaysAgo;
      } else if (filter === "thismonth") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === "lastmonth") {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return orderDate >= lastMonth && orderDate <= lastMonthEnd;
      }
      return true;
    });
  };

  const filteredOrders = filterOrders();
  const totalPaidOrders = filteredOrders.filter(
    (order) => order.paymentStatus === "paid"
  ).length;
  const totalRevenue = filteredOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((acc, order) => acc + order.totalAmount, 0);
  const totalCompletedOrders = filteredOrders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  const revenueByDay = filteredOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});

  const chartData = Object.keys(revenueByDay).map((date) => ({
    date,
    revenue: revenueByDay[date],
  }));

  return (
    <div className="p-6 border border-gray-300 rounded-lg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Revenue Details</h2>
        <select
          className="border border-gray-500 p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="last7days">Last 7 Days</option>
          <option value="thismonth">This Month</option>
          <option value="lastmonth">Last Month</option>
          <option value="allRevenue">All </option>
        </select>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <ShoppingBag size={32} />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Successful Orders
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {totalPaidOrders}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <DollarSign size={32} />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
            <CheckCircle size={32} />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Completed Orders
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {totalCompletedOrders}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Revenue Per Day
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Tops Products */}
      <div className="mt-6">
        <TopProductsTable/>
      </div>
      {/* Complaint Data */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Complaint Data
        </h3>
        <ComplaintDataCard />
      </div>
    </div>
  );
};

export default RevenueDetails;
