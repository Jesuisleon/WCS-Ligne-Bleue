const models = require("../models");

const add = (req, res) => {
  const userId = parseInt(req.body.userId, 10);
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

const browse = (req, res) => {
  models.user_journey
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readAllForUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  models.user_journey
    .findAllForUser(userId)
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

module.exports = {
  add,
  browse,
  readAllForUser,
};
