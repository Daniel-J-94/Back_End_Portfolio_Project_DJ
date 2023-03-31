const db = require("../db/connection");

exports.removeComment = (id) => {
  const psqlQuery = `DELETE FROM comments WHERE comment_id = $1;`;
  return db
    .query(psqlQuery, [id])

    .then((result) => {
      console.log("result in model", result);
      return resultComment;
    });
};
