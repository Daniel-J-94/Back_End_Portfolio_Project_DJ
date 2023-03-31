const db = require("../db/connection");

exports.removeComment = (id) => {
  const psqlQuery = `DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`;
  return db
    .query(psqlQuery, [id])

    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: ` no comment found for comment_id`,
        });
      } else {
        return result;
      }
    });
};
