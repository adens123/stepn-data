const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/", userController.home);

router.get("/browser", async (req, res) => {
  const priceData = require("./getCM_price.js");
  let data = await priceData();
  res.json(data);
});

module.exports = router;
