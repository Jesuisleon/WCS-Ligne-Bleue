const models = require("../models");

const add = (req, res) => {
  const userId = parseInt(req.body.userId, 10);
  const tutorialId = parseInt(req.body.tutorialId, 10);
  const { comment } = req.body;
  models.comment
    .insert({ userId, tutorialId, comment })
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
  models.comment
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readAllForTutorial = (req, res) => {
  const tutorialId = parseInt(req.params.id, 10);
  models.comment
    .findAllForTutorial(tutorialId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  browse,
  readAllForTutorial,
};
