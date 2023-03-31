const { sendComment } = require("../models/postCommentModel");

exports.postComment = (req, res, next) => {
  const id = req.params.review_id;
  const body = req.body.body;
  const author = req.body.username;
  sendComment(author, body, id)
    .then((result) => {
      res.status(201).send({ new_comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
