const db = require("../db/connection");

exports.updateVotes = (id, voteChange) => {
  // const dateSetter = new Date(Date.now());

  // const psqlQuery = `UPDATE reviews
  // SET votes = $2
  // WHERE review_id = $1;`;
  const psqlQuery = `UPDATE reviews
  
  SET votes = $2
  WHERE review_id = $1 RETURNING *`;
  // const values = [body, 0, author, id, dateSetter];

  return db.query(psqlQuery, [id, voteChange]).then((result) => {
    console.log("result", result);
    return result.rows;
  });
};
