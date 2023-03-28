const { fetchReviewById } = require("../models/getReviewByIdModel.js");

exports.getReviewById = (req, res, next) => {
  const revIdFromReq = req.params;
  fetchReviewById(revIdFromReq)
    .then((result) => {
      console.log("result!", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
