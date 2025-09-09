const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminRoutes = require("./routes/admin/admin-routes");
const adminMetricsRoute = require("./controllers/admin/adminMetrics");
const topProductsRoutes = require("./routes/admin/topProducts-routes");
const salesByCategoryRotes = require("./routes/admin/salesByCategory-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const userRouter = require("./routes/common/user-routes");
const resetPasswordRoutes = require("./routes/common/reset-password-routes");
const complaintRoutes = require("./routes/common/complaint-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: "https://ssphere-e-commerce-company.vercel.app/shop/home",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", adminMetricsRoute);
app.use("/api/topproducts", topProductsRoutes);
app.use("/api/sales-by-category", salesByCategoryRotes);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.use("/api", userRouter);
app.use("/api", resetPasswordRoutes);
app.use("/api/feature-images", commonFeatureRouter);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is now running on port ${PORT}`)
);
