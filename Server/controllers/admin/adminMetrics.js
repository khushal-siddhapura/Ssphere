const express = require("express");
const mongoose = require("mongoose");
const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Complaint = require("../../models/Complaint");
const router = express.Router();

router.get("/admin/dashboard", async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
    ]);

    const totalUsers = await User.countDocuments();

    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalComplaints = await Complaint.countDocuments();

    const totalOrders = await Order.countDocuments({ paymentStatus: "paid" });

    const totalProducts = await Product.countDocuments();

    const recentOrders = await Order.find().sort({ orderDate: -1 }).limit(5);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7); // Get the date 7 days ago

    const salesData = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: last7Days },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $dayOfYear: "$orderDate" },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date (ascending)
    ]);

    const formattedSalesData = salesData.map((item) => ({
      date: new Date(last7Days.getFullYear(), 0, item._id).toLocaleDateString(), // Convert day of the year to a date
      totalSales: item.totalAmount,
    }));

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.totalAmount || 0,
      totalUsers,
      totalAdmins,
      totalComplaints,
      totalOrders,
      totalProducts,
      recentOrders,
      salesData: formattedSalesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
