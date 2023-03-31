const express = require("express");

const { getReviews } = require("./controllers/getReviewsController");

const { getReviewById } = require("./controllers/getReviewByIdController");

const { getCategories } = require("./controllers/getCategoriesController");
const {
  postComment,
} = require("../be-nc-games/controllers/postCommentController");
const {
  getCommentsByReviewId,
} = require("./controllers/getCommentsByReviewIdController");
const { patchVotes } = require("./controllers/patchVotesController");
const { deleteComment } = require("./controllers/deleteCommentController");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews", getReviews);
app.post("/api/reviews/:review_id/comments", postComment);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);
app.patch("/api/reviews/:review_id", patchVotes);
app.delete("/api/comments/:comment_id", deleteComment);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Doesn't exist" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  // if (err.code === "10000000") {
  //   res.status(204).send({ msg: "No Content" });
  // }
  if (err.code === "23502") {
    res.status(400).send({ msg: "Please enter a valid comment" });
  }
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  }
  if (err.code === "23503") {
    res.status(404).send({ msg: "Invalid username or review ID" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send({ message: "Server error" });
});

module.exports = app;
