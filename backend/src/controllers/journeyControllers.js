const models = require("../models");

const read = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  models.user_journey
    .findAllJourneysForUser(userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const tutorialId = parseInt(req.body.tutorialId, 10);
  models.user_journey
    .insert({ userId, tutorialId })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  read,
  add,
};
