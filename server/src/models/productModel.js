import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    images: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    
    
    variants: [
      {
        size: {
          type: String,
          required: true,
          enum: ["UK7", "UK8", "UK9", "UK10"],
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        price: {
          type: Number,
          required: true, 
          min: 0,
        },
        _id: false,
      },
    ],
    
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for performance
productSchema.index({ categoryId: 1 });
productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
