const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
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

app.listen(process.env.PORT, () => {
  console.log("server started");
});
