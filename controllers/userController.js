const priceData = require("../getCM_price.js");
let count = 0;

exports.home = async (req, res) => {
  try {
    let data = await priceData();
    const [gmt, gst, sneaker, scroll] = data;
    const mintCost = 50 + (380 * gst.price) / gmt.price + scroll.price * 2;

    res.render("home", { gmt, gst, sneaker, scroll, mintCost });

    count++;
    console.log(`第 ${count} 次更新資料`);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};
