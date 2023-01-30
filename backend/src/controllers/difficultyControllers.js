const models = require("../models");

const browse = (req, res) => {
  models.difficulty
    .findAllName()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const difficulty = req.body;
  if (req.body.admin !== 1) {
    res.sendStatus(403);
  } else {
    models.difficulty
      .insert(difficulty)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = {
  browse,
  add,
};
