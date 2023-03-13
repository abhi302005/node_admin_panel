const mongoose = require("mongoose");

const productDetails = new mongoose.Schema({
  prodImg: [String],
  prodName: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
    minlength: [5, "Name must have more or equal then 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  prodCategory: {
    type: String,
    required: [true, "A product must have Category"],
  },
  prodQty: {
    type: Number,
    required: [true, "A product must have valid quantity"],
    min: [0, "Qty must be above 0"],
  },
  prod_mrp: {
    type: Number,
    required: [true, "A product must have MRP"],
    min: [0, "MRP should be greater than 0"],
  },
  prod_salePrice: {
    type: Number,
    default: 0,
    validate: {
      validator: function (val) {
        return val < this.prod_mrp;
      },
      message: "Sale price should be lesser than MRP",
    },
  },
  isFeatured: {
    type: String,
    enum: {
      values: ["true", "false"],
      message: "value could be true/false",
    },
  },
  prodStatus: {
    type: String,
    enum: {
      values: ["active", "deactivate"],
      message: "value could be active/deactivate",
    },
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  // todo => resolve the updateAt bug "it may not getting updated while we update the record."
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: true,
  },
});

const prodDetails = mongoose.model("product_details", productDetails);

module.exports = prodDetails;
