const express = require("express");
const { getCategories } = require("./controllers/getCategoriesController");
const { getReviewById } = require("./controllers/getReviewByIdController");
const { getReviews } = require("./controllers/getReviewsController");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews", getReviews);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Doesn't exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send({ message: "No review with that ID" });
});
module.exports = app;
