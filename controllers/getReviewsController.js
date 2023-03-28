const { fetchReviews } = require("../models/getReviewsModel");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((result) => {
      res.status(200).send({ reviews: result });
    })
    .catch((err) => {
      next(err);
    });
};
