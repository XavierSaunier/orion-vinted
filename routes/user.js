const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (!user) {
      const salt = uid2(16);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const token = uid2(64);
      let password = req.fields.password;
      //console.log(password);

      const newUser = new User({
        email: req.fields.email,
        account: { username: req.fields.username, phone: req.fields.phone },
        token: token,
        hash: hash,
        salt: salt,
      });
      //console.log(newUser);
      await newUser.save();
      let userProfile = {
        id: newUser.id,
        account: newUser.account,
        token: newUser.token,
      };
      console.log(userProfile);
      res.status(200).json(userProfile);
    } else {
      res.status(409).json({ message: "email already has an account" });
    }
  } catch (error) {
    res.status(400).json({ message: "requête invalide" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.fields.email });
    console.log(user[0].hash);
    const newHash = SHA256(req.fields.password + user[0].salt).toString(
      encBase64
    );
    let userProfile = {
      id: user[0].id,
      account: user[0].account,
      token: user[0].token,
    };
    console.log(newHash);
    if (newHash === user[0].hash) {
      res.status(200).json(userProfile);
      //console.log("passage autorisé");
    } else {
      res.status(400).json({ message: "accès refusé" });
      //console.log("passage refusé");
    }
  } catch (error) {
    res.status(400).json({ message: "requête invalide" });
  }
  //res.json({ message: "clear for login" });
});

module.exports = router;
