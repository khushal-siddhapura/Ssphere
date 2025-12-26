const Orders = require("../../models/Order");
const Products = require("../../models/Product");

const salesByCategory = (orders, products) => {
  const categorySales = {};

  orders.forEach((order) => {
    if (order.paymentStatus === "paid") {
      order.cartItems.forEach((item) => {
        const product = products.find((prod) => prod._id.toString() === item.productId);
        if (product) {
          const category = product.category;
          const sales = item.quantity * product.salePrice;
          categorySales[category] = (categorySales[category] || 0) + sales;
        }
      });
    }
  });
  return categorySales;
};

const getCategorySales = async (req, res) => {
  try {
    const orders = await Orders.find();
    const products = await Products.find();

    const categorySalesData = salesByCategory(orders, products);
    res.status(200).json(categorySalesData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getCategorySales };
