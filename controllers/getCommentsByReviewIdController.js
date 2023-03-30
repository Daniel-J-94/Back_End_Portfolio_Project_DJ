const {
  fetchCommentsByReviewId,
} = require("../models/getCommentsByReviewIdModel");
const { getReviewsByReviewId } = require("./getReviewsController");

exports.getCommentsByReviewId = (req, res, next) => {
  const revIdFromReq = req.params.review_id;
  getReviewsByReviewId(revIdFromReq, next);
  fetchCommentsByReviewId(revIdFromReq)
    .then((result) => {
      res.status(200).send({ comments: result });
    })
    .catch((err) => {
      next(err);
    });
};
