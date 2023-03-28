const express = require("express");

const { getReviewById } = require("./controllers/getReviewByIdController");
const { getCategories } = require("./controllers/getCategoriesController");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Doesn't exist" });
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server error" });
});
module.exports = app;
