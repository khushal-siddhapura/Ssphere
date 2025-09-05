import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Users,
  ShieldAlert,
  MessageSquare,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentOrders from "@/components/admin-view/RecentOrders";
import DashboardRevenue from "@/components/admin-view/DashboardRevenue";

const DashboardView = () => {
  const [adminMetrics, setAdminMetrics] = useState(null);

  useEffect(() => {
    const fetchAdminMetrics = async () => {
      try {
        const response = await fetch(
          "https://ssphere-e-commerce-company.onrender.com/api/admin/dashboard"
        );
        const data = await response.json();
        setAdminMetrics(data);
      } catch (error) {
        console.error("Error fetching admin metrics:", error);
      }
    };

    fetchAdminMetrics();
  }, []);

  if (!adminMetrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 border border-gray-300 min-h-screen rounded-lg">
      <div className="flex min-h-screen bg-gray-50">
        {/* Main Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 shadow-sm border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition">
              <div>
                <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                <p className="text-2xl font-bold">
                  ${adminMetrics.totalRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </Card>

            <Card className="p-4 shadow-sm border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition">
              <div>
                <h3 className="text-gray-500 text-sm">Total Users</h3>
                <p className="text-2xl font-bold">{adminMetrics.totalUsers}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600" />
            </Card>

            <Card className="p-4 shadow-sm border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition">
              <div>
                <h3 className="text-gray-500 text-sm">Admin Users</h3>
                <p className="text-2xl font-bold">{adminMetrics.totalAdmins}</p>
              </div>
              <ShieldAlert className="w-10 h-10 text-purple-600" />
            </Card>

            <Card className="p-4 shadow-sm border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition">
              <div>
                <h3 className="text-gray-500 text-sm">Total Complaints</h3>
                <p className="text-2xl font-bold">
                  {adminMetrics.totalComplaints}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-red-500" />
            </Card>

            <Card className="p-4 shadow-sm border rounded-lg flex justify-between items-center bg-white hover:shadow-md transition sm:col-span-2 lg:col-span-1">
              <div>
                <h3 className="text-gray-500 text-sm">Listed Products</h3>
                <p className="text-2xl font-bold">
                  {adminMetrics.totalProducts}
                </p>
              </div>
              <Package className="w-10 h-10 text-yellow-500" />
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <RecentOrders />
            <Card className="p-4 border rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/admin/products"
                    className="bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Add New Product
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    View All Orders
                  </Link>
                  <Link
                    to="/admin/user"
                    className="bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Manage Users
                  </Link>
                  <Link
                    to="/admin/manageadmins"
                    className="bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Manage Admin
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-5">
            <DashboardRevenue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
