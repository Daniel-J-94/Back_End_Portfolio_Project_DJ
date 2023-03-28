const db = require("../db/connection");

exports.getterCommentsByReviewId = (revIdFromReq) => {
  console.log(
    "I'm in the getrevbyidModel! Here is the revIdfromthecontoller as an arugument in the model:",
    revIdFromReq.review_id
  );
  const revIdNumber = revIdFromReq.review_id;

  return db
    .query(`SELECT * FROM comments WHERE comments.review_id = $1`, [
      revIdNumber,
    ])
    .then((result) => {
      return result.rows;
    });
};
