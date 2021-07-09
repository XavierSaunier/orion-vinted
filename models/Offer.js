const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  product_name: String,
  product_description: String,
  product_price: Number,
  product_details: Array,
  product_image: { type: mongoose.Schema.Types.Mixed, defaut: {} },
  owner: {
    type: mongoose.Schema.Types.Object,
    ref: "User",
  },
});

module.exports = Offer;
