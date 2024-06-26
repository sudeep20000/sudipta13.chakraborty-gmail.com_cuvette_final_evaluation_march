const mongoose = require("mongoose");
// const paginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please provide brand name"],
  },
  model: {
    type: String,
    required: [true, "Please provide model name"],
  },
  productName: {
    type: String,
    required: [true, "Please provide product name"],
  },
  type: {
    type: String,
    required: [true, "Please provide type"],
  },
  color: {
    type: String,
    required: [true, "Please provide color"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  available: {
    type: Boolean,
    required: [true, "Please provide availability"],
  },
  reviews: {
    type: Number,
    required: [true, "Please provide reviews"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide rating"],
  },
  images: [
    {
      type: String,
      required: [true, "Please provide product imgs"],
    },
  ],
  features: [
    {
      type: String,
      required: [true, "Please provide features"],
    },
  ],
  about: {
    type: String,
    required: [true, "Please provide short description"],
  },
});

// productSchema.plugin(paginate);

module.exports = mongoose.model("Product", productSchema);
