const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: [80, "Title too long"],
    },
    price: {
      type: String,
      required: [true, "Please provide price"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    images: {
      type: [String],
      required: [true, "Please upload images"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
