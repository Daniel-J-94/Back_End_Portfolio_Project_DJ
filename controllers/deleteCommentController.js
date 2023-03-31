const { removeComment } = require("../models/deleteCommentModel");

exports.deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then((result) => {
      res.status(204).send(result.body);
    })
    .catch((err) => {
      next(err);
    });
};
