const priceData = require("../getCM_price.js");

exports.home = async (req, res) => {
  try {
    const [gmt, gst, sneaker, scroll] = priceData;
    const mintCost = 50 + (380 * gst.price) / gmt.price + scroll.price * 2;

    res.render("home", { gmt, gst, sneaker, scroll, mintCost });
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};
