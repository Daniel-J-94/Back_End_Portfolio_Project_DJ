const { fetchReviews, fetchReviewsById } = require("../models/getReviewsModel");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((result) => {
      res.status(200).send({ reviews: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewsByReviewId = (id, next) => {
  fetchReviewsById(id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      next(err);
    });
};
