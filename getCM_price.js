const axios = require("axios");
const cheerio = require("cheerio");

// cloudflare反爬蟲
const cloudscraper = require("cloudscraper");

// 依照順序取得價格
// async function main() {
//   const priceArr = [];

//   // 取得及時價格
//   async function getCMCPrice(cryptoName) {
//     const url = `https://coinmarketcap.com/currencies/${cryptoName}/`;
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const coinName = $("span.dXQGRd").text();
//     const price = $("span.jxpCgO").text().substring(1);
//     const currencies = { coinName, price: Number(price) };
//     priceArr.push(currencies);
//   }

//   // 取得即時地板價格
//   async function getFloorPrice() {
//     const sneaker = (
//       await axios.get(
//         "https://apilb.stepn.com/run/orderlist?saleId=1&order=2001&chain=103&refresh=true&page=0&otd=&type=&gType=&quality=&level=0&bread=0"
//       )
//     ).data.data[0].sellPrice;

//     const scroll = (
//       await axios.get(
//         "https://apilb.stepn.com/run/orderlist?saleId=1&order=2001&chain=103&refresh=true&page=0&otd=&type=701&gType=&quality=1&level=0&bread=0"
//       )
//     ).data.data[0].sellPrice;

//     priceArr.push(
//       { coinName: "sneaker", price: Number(sneaker) / 100 },
//       { coinName: "scroll", price: Number(scroll) / 100 }
//     );
//   }
//   await getCMCPrice("green-metaverse-token");
//   await getCMCPrice("green-satoshi-token");
//   await getFloorPrice();
//   return priceArr;
// }

async function main() {
  const priceArr = [];
  let sneaker = 0;
  let scroll = 0;

  // 取得及時價格
  async function getCMCPrice(cryptoName) {
    const url = `https://coinmarketcap.com/currencies/${cryptoName}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const coinName = $("span.dXQGRd").text();
    const price = $("span.jxpCgO").text().substring(1);
    const currencies = { coinName, price: Number(price) };
    priceArr.push(currencies);
  }

  // 取得即時地板價格
  async function getFloorPrice() {
    await cloudscraper.get(
      "https://apilb.stepn.com/run/orderlist?saleId=1&order=2001&chain=103&refresh=true&page=0&otd=&type=&gType=&quality=&level=0&bread=0",
      function (error, response, body) {
        if (error) {
          console.log("Error occurred");
        } else {
          const data = JSON.parse(body);
          sneaker = data.data[0].sellPrice;
        }
      }
    );

    await cloudscraper.get(
      "https://apilb.stepn.com/run/orderlist?saleId=1&order=2001&chain=103&refresh=true&page=0&otd=&type=701&gType=&quality=1&level=0&bread=0",
      function (error, response, body) {
        if (error) {
          console.log("Error occurred");
        } else {
          const data = JSON.parse(body);
          scroll = data.data[0].sellPrice;
        }
      }
    );

    priceArr.push(
      { coinName: "sneaker", price: Number(sneaker) / 100 },
      { coinName: "scroll", price: Number(scroll) / 100 }
    );
  }

  await getCMCPrice("green-metaverse-token");
  await getCMCPrice("green-satoshi-token");
  await getFloorPrice();
  return priceArr;
}

async function start() {
  const client = await main();
  module.exports = client;
  const app = require("./app");
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
  });
}

start();
