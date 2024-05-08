const express = require("express");
// const priceData = require("./getCM_price.js");

const app = express();

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
