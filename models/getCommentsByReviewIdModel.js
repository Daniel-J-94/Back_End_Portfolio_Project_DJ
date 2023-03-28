const db = require("../db/connection");

exports.getterCommentsByReviewId = (revIdFromReq) => {
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query(`SELECT * FROM comments WHERE comments.review_id = $1`, [
      revIdNumber,
    ])
    .then((result) => {
      return result.rows;
    });
};
