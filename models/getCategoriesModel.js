const db = require("../db/connection");

exports.getterCategories = () => {
  console.log("I'm in the getCatModel!");
  //   console.log("this is the category in the model:", category);
  return db.query(`SELECT * FROM categories;`).then((result) => {
    return result.rows;
  });
};
