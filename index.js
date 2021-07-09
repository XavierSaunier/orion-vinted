const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());

mongoose.connect("mongodb://localhost/vinted", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoutes = require("./routes/user");
app.use(userRoutes);
const userOffer = require("./routes/offer");
app.use(userOffer);

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("server started");
});
