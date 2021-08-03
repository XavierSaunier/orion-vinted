const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
const router = express.Router();

const Payment = require("../models/Payment");

router.post("/payment", isAuthenticated, async (req, res) => {
  try {
    const response = await stripe.charges.create({
      token: req.fields.stripeToken,
      title: req.fields.title,
      amount: req.fields.price,
    });
    if (response.status === "succeeded") {
      res.status(200).json({ message: "Paiement validé" });
    } else {
      res.status(400).json({ message: "Une erreur s'est produite" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
