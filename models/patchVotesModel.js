const db = require("../db/connection");

exports.updateVotes = (id, voteChange) => {
  const psqlQuery = `UPDATE reviews
  
  SET votes = votes + $2
  WHERE review_id = $1 RETURNING *`;

  return db.query(psqlQuery, [id, voteChange]).then((result) => {
    return result.rows[0];
  });
};
