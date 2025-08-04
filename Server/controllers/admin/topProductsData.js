const Reviews = require("../../models/Review");
const Orders = require("../../models/Order");

const topProducts = async (req, res) => {
  try {
    const products = await Orders.aggregate([
      //Unwind the cart item so we can work with individual product
      {
        $match: {
            paymentStatus: "paid"
        }
      },

      { $unwind: "$cartItems" },

      {
        $addFields: {
          "cartItems.quantity": { $toDouble: "$cartItems.quantity" },
          "cartItems.price": { $toDouble: "$cartItems.price" },
        },
      },

      {
        $group: {
          _id: "$cartItems.productId",
          productName: {$first: "$cartItems.title"},
          totalQuantity: { $sum: "$cartItems.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$cartItems.quantity", "$cartItems.price"] },
          },
        },
      },

      { $sort: { totalRevenue: -1 } },

      { $limit: 5 },
    ]);

    const productIds = products.map(product => product._id);

    const reviews = await Reviews.aggregate([
        {
          $match: {
            productId: { $in: productIds },
          },
        },
        {
          $group: {
            _id: "$productId", // Group by productId
            avgRating: { $avg: "$reviewValue" }, // Calculate the average rating
          },
        },
      ]);

      const result = products.map(product => {
        // Find the average rating for the product
        const review = reviews.find(r => r._id.toString() === product._id.toString());
        return {
          ...product,
          avgRating: review ? review.avgRating : null,
        };
      });

    res.json(result);
  } catch (error) {
    console.log("error is :=", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = topProducts;
