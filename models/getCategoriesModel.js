const db = require("../db/connection");

exports.getterCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((result) => {
    return result.rows;
  });
};
