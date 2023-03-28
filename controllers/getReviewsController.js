const { getterReviews } = require("../models/getReviewsModel");

exports.getReviews = (req, res, next) => {
  getterReviews()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
