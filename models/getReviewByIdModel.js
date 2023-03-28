const db = require("../db/connection");

exports.fetchReviewById = (revIdFromReq) => {
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [revIdNumber])

    .then((result) => {
      console.log("model result:", result);
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: ` no review found for review_id`,
        });
      } else {
        return result.rows[0];
      }
    });
};
