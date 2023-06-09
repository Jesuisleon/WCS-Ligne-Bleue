const models = require("../models");

const add = (req, res) => {
  const userId = parseInt(req.body.userId, 10);
  const tutorialId = parseInt(req.body.tutorialId, 10);
  const { comment } = req.body;
  const rating = parseInt(req.body.rating, 10);
  models.user_journey
    .insert({ userId, tutorialId, rating, comment })
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
  const userId = parseInt(req.params.userId, 10);
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

const browseTutoRating = (req, res) => {
  const promises = req.modifiedTuto.map((e) => {
    return models.user_journey.findAverageRatingForTuto(e.id).then(([rows]) => {
      e.rating = rows[0].rating;
      return e;
    });
  });
  Promise.all(promises)
    .then((modifiedTuto) => {
      res.send(modifiedTuto);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseTutoComments = (req, res) => {
  models.user_journey
    .findAllCommentsForTuto(req.params.id)
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
  readAllForUser,
  browseTutoRating,
  browseTutoComments,
};
