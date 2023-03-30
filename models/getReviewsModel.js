const db = require("../db/connection");

exports.fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.review_id, owner, title, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.comment_id)::INT AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`
    )
    .then((result) => {
      const zeroObject = [];
      const rowsOfRes = result.rows;
      rowsOfRes.forEach((element) =>
        zeroObject.push({
          review_id: element.review_id,
          comment_count: element.comment_count,
        })
      );
      return result.rows;
    });
};
exports.fetchReviewsById = (revId) => {
  return db
    .query(`SELECT reviews.review_id FROM reviews WHERE review_id = $1`, [
      revId,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,

          msg: ` no review found for review_id`,
        });
      }
      return result.rows;
    });
};
