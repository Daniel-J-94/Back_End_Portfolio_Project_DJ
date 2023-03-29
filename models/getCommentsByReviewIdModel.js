const db = require("../db/connection");

exports.fetchCommentsByReviewId = (reviewIdFromRequest) => {
  return db
    .query(`SELECT * FROM comments WHERE comments.review_id = $1`, [
      reviewIdFromRequest,
    ])
    .then((result) => {
      return result.rows;
    });
};
