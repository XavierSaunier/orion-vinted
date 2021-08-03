const mongoose = require("mongoose");

const Payment = mongoose.model("Payment", {
  token: String,
  title: String,
  amount: Number,
});

module.exports = Payment;
