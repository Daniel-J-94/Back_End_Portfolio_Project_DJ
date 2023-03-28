const db = require("../db/connection");

exports.getterReviewById = (revIdFromReq) => {
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${revIdNumber};`)
    .then((result) => {
      return result.rows[0];
    });
};
