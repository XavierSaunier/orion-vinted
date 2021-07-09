const express = require("express");
//const formidable = require("express-formidable");
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
//router.use(formidable);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const Offer = require("../models/Offer");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    /*const newOffer = await new Offer({
      product_name: req.fields.product_name,
      product_description: req.fields.product_description,
      product_price: req.fields.product_price,
      product_details: [req.fields.product_details],

      owner: {
        account: req.owner.account,
        id: req.owner.id,
        email: req.owner.email,
      },
    });
    const uploadedPic = await cloudinary.uploader.upload(pictureToUpload, {
      folder: `/orion-vinted/offer/${newOffer.id}`,
    });
    newOffer.product_image = uploadedPic.secure_url;*/
    const {
      product_name,
      product_description,
      product_price,
      size,
      brand,
      color,
      city,
      condition,
    } = req.fields;

    let details = [];
    details.push(size, brand, color, condition, city);
    console.log(details);

    const newOffer = new Offer({
      product_name: product_name,
      product_description: product_description,
      product_price: product_price,
      product_details: [
        { size: size },
        { brand: brand },
        { condition: condition },
        { couleur: color },
        { place: city },
      ],
      owner: { id: req.owner.id, profile: req.owner.account },
    });
    console.log(req.fields.size);
    const result = await cloudinary.uploader.upload(
      req.files.product_image.path,
      {
        folder: `/orion-vinted/offer/${newOffer.id}`,
      }
    );
    newOffer.product_image = result;
    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/offers", async (req, res) => {
  try {
    let sorting = req.query.sort;
    //console.log(sorting);
    if (sorting === "price_desc") {
      sorting = 1;
    } else if (sorting === "price_asc") {
      sorting = -1;
    }

    if (req.query.price_min === "") {
      req.query.price_min = "0";
    }
    if (req.query.price_max === "") {
      req.query.price_max = "99999999999999999";
    }

    let skipper = (req.query.page - 1) * 2;

    const offers = await Offer.find({
      product_name: new RegExp(req.query.title, "i"),
      product_price: { $gte: req.query.price_min, $lte: req.query.price_max },
    })
      .select("product_name product_description product_price")
      .sort({ product_price: sorting })
      .skip(skipper)
      .limit(2);

    res.json(offers);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/offers/:id", async (req, res) => {
  try {
    const offerDetails = await Offer.findById(req.params.id);
    console.log(offerDetails);
    res.json(offerDetails);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
