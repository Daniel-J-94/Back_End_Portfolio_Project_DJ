const db = require("../db/connection");

exports.sendComment = (author, body, id) => {
  const dateSetter = new Date(Date.now());

  const psqlQuery = `INSERT INTO comments (body, votes, author, review_id, created_at) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const values = [body, 0, author, id, dateSetter];
  return db
    .query(psqlQuery, values)

    .then((result) => {
      const resultComment = result.rows[0];
      return resultComment;
    });
};
