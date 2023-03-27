const db = require("../db/connection");

exports.getterCategories = () => {
  console.log("I'm in the getCatModel!");

  return db.query(`SELECT * FROM categories;`).then((result) => {
    return result.rows;
  });
};
