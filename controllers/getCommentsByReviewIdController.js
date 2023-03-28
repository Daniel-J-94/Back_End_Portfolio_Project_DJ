const {
  getterCommentsByReviewId,
} = require("../models/getCommentsByReviewIdModel");

exports.getCommentsByReviewId = (req, res, next) => {
  const revIdFromReq = req.params;
  getterCommentsByReviewId(revIdFromReq)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
