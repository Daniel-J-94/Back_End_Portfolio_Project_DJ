const { fetchReviewById } = require("../models/getReviewByIdModel.js");

exports.getReviewById = (req, res, next) => {
  const revIdFromReq = req.params.review_id;

  fetchReviewById(revIdFromReq)
    .then((result) => {
      res.status(200).send(result);
    })

    .catch((err) => {
      next(err);
    });
};
