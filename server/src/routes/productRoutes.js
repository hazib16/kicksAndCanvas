import express from "express";
import {
  getBestSellers,
  getNewArrivals,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/best-sellers", getBestSellers);
router.get("/new-arrivals", getNewArrivals);
router.get("/:id", getProductById);
router.get("/", getProducts);

export default router;
