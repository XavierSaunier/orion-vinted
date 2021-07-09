const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    unique: true,
    required: true,
  },
  account: {
    username: {
      type: String,
      required: true,
    },

    avatar: mongoose.Schema.Types.Mixed,
    phone: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
