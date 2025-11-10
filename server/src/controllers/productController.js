import Product from "../models/productModel.js";

///Get all products with filters
export const getProducts = async (req, res) => {
  try {
    const { category, limit = 10, page = 1, sort = "newest" } = req.query;
    const filter = { isActive: true, isBlocked: true };
    if (category) {
      filter.categoryId = category;
    }

    let sortObj = { createdAt: -1 };

    if (sort === "price-low") {
      sortObj = { salePrice: 1 };
    } else if (sort === "price-high") {
      sortObj = { salePrice: -1 };
    } else if (sort === "popularity") {
      sortObj = { totalSales: -1 };
    } else if (sort === "rating") {
      sortObj = { averageRating: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip)
      .populate("categoryId", "name slug");

    //total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

///Best Sellers
export const getBestSellers = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const bestSellers = await Product.find({
      isActive: true,
      isBlocked: false,
    })
      .sort({ totalSales: -1 })
      .limit(parseInt(limit))
      .populate("categoryId", "name slug");

    res.json({
      success: true,
      products: bestSellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching best sellers",
      error: error.message,
    });
  }
};

///New arrivals
export const getNewArrivals = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const newArrivals = await Product.find({
      isActive: true,
      isBlocked: false,
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("categoryId", "name slug");

    res.json({
      success: true,
      products: newArrivals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching New Arrivals",
      error: error.message,
    });
  }
};

///Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};
