const express = require("express");
const { getReviewById } = require("./controllers/getReviewByIdController");
const app = express();

app.get("/api/reviews/:review_id", getReviewById);
app.use("*", (err, req, res, next) => {
  res.status(404).send({ message: "Doesn't exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error" });
});
module.exports = app;
