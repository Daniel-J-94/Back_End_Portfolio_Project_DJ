const { removeComment } = require("../models/deleteCommentModel");

exports.deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then((result) => {
      res.status(204).send(res.sendStatus(204));
    })
    .catch((err) => {
      next(err);
    });
};
