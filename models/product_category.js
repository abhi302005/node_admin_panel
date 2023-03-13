const mongoose = require("mongoose");

const productCategory = new mongoose.Schema({
  categoryImg: {
    type: String,
    required: [true, "A category must have a img"],
  },
  categoryName: {
    type: String,
    required: [true, "A category must have a name"],
    unique: true,
    trim: true,
    minlength: [2, "Name must have more or equal then 2 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
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

const prodCategory = mongoose.model("product_category", productCategory);

module.exports = prodCategory;
