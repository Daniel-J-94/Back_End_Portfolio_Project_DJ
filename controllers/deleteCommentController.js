const { removeComment } = require("../models/deleteCommentModel");

exports.postComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then((result) => {
      res.status(204).send({ msg: "No Content" });
    })
    .catch((err) => {
      next(err);
    });
};
