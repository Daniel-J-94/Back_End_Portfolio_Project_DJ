const { getterCategories } = require("../models/getCategoriesModel");

exports.getCategories = (req, res, next) => {
  getterCategories()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
