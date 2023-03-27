const { getterReviews } = require("../models/getReviewsModel");

exports.getReviews = (req, res, next) => {
  console.log("i'm in the getRevs controller!");
  getterReviews()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
