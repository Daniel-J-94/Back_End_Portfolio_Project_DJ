const { getterCategories } = require("../models/getCategoriesModel");

exports.getCategories = (req, res, next) => {
  console.log("i'm in the grabCats controller!");
  getterCategories()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
