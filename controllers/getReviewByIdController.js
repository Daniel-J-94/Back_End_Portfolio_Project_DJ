const { getterReviewById } = require("../models/getReviewByIdModel.js");

exports.getReviewById = (req, res, next) => {
  const revIdFromReq = req.params;
  console.log(
    "i'm in the getrevbyid controller! here is the input req.params/revIdFromReq:",
    revIdFromReq
  );
  getterReviewById(revIdFromReq)
    .then((result) => {
      console.log(
        "im in the then block of the getterevbyid controller and this is the result coming back from the model as it is here:",
        result
      );
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
