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

module.exports = {
  browse,
};
