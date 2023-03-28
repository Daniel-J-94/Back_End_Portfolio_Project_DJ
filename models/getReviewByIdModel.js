const db = require("../db/connection");

exports.fetchReviewById = (revIdFromReq) => {
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${revIdNumber};`)
    .then((result) => {
      console.log("model result:", result);
      if (result.rows.length === 0) {
        return err;
      } else {
        return result.rows[0];
      }
    });
};
