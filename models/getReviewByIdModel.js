const db = require("../db/connection");

exports.fetchReviewById = (reviewId) => {
  return (
    db

      .query("SELECT * FROM reviews WHERE review_id = $1;", [reviewId])
      // IDEA OF HOW TO DO THIS, REQUIRE IN THE COMMENT COUNT DATA FROM THE OTHER ENDPOINT AND USE IT TO WORK OUT THE REVIEWS WITH 0 COMMENTS, USE THAT AS THE FIRST IF STATMENT AND IF IT HAS 0 REVIEWS, RETURN  { comments: [] }
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({
            status: 404,

            msg: ` no review found for review_id`,
          });
        } else {
          return result.rows[0];
        }
      })
  );
};
