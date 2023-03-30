const { updateVotes } = require("../models/patchVotesModel");

exports.patchVotes = (req, res, next) => {
  const id = req.params.review_id;
  const voteChange = req.body.inc_votes;

  updateVotes(id, voteChange)
    .then((result) => {
      res.status(201).send({ review: result });
    })

    .catch((err) => {
      next(err);
    });
};
