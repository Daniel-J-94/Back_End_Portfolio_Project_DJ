const express = require("express");
const { getCategories } = require("./controllers/getCategoriesController");
const app = express();

app.get("/api/categories", getCategories);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Doesn't exist" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send({ message: "Doesn't exist" });
});
module.exports = app;
