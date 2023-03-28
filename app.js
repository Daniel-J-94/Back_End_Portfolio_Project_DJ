const express = require("express");
const { getReviews } = require("./controllers/getReviewsController");
const app = express();

app.get("/api/reviews", getReviews);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Doesn't exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error" });
});
module.exports = app;
