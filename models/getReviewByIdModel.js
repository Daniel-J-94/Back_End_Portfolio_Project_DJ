const db = require("../db/connection");

exports.getterReviewById = (revIdFromReq) => {
  console.log(
    "I'm in the getrevbyidModel! Here is the revIdfromthecontoller as an arugument in the model:",
    revIdFromReq.review_id
  );
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${revIdNumber};`)
    .then((result) => {
      console.log(
        "im in the then block of the revid model and this is the result:",
        result.rows
      );
      return result.rows[0];
    });
};
