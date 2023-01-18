const models = require("../models");

const checkHashtag = (req, res, hashtag) => {
  const hashtagId = [];
  for (let i = 0; i < hashtag.length; i += 1) {
    models.hashtag
      .findHashtag(hashtag[i])
      .then(([rows]) => {
        if (rows[0] == null) {
          models.hashtag
            .insert(hashtag[i])
            .then(([result]) => {
              hashtagId[i] = result.insertId;
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        } else hashtagId[i] = rows[0].id;
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
  return hashtagId;
};

const browse = (req, res) => {
  let where = "";
  if (req.query.theme != null) {
    where = ` where theme_id = '${req.query.theme}'`;
  }
  models.tutorial
    .findAllTutorials(where)
    .then(([rows]) => {
      const tuto = rows;
      let promiseChain = Promise.resolve();
      const modifiedTuto = tuto.map((element) => {
        const newElement = { ...element };
        promiseChain = promiseChain
          .then(() => models.tuto_hashtag.findTutorialHashtag(newElement.id))
          .then((results) => {
            const resultsWithNewKey = results[0].map(
              ({ hashtagId: oldKeyA, hashtagText: oldKeyB, ...others }) => ({
                id: oldKeyA,
                text: oldKeyB,
                ...others,
              })
            );
            newElement.hashtag = resultsWithNewKey.map(function f(obj) {
              return obj;
            });
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        return newElement;
      });
      promiseChain
        .then(() => {
          res.send(modifiedTuto);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.tutorial
    .findTutorial(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const tuto = rows[0];
        models.tuto_hashtag
          .findTutorialHashtag(req.params.id)
          .then((results) => {
            const resultsWithNewKey = results[0].map(
              ({ hashtagId: oldKeyA, hashtagText: oldKeyB, ...others }) => ({
                id: oldKeyA,
                text: oldKeyB,
                ...others,
              })
            );
            tuto.hashtag = resultsWithNewKey.map(function f(obj) {
              return obj;
            });

            res.send(tuto);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const tutorial = req.body;

  tutorial.id = parseInt(req.params.id, 10);
  if (req.body.admin !== 1) {
    res.sendStatus(403);
  } else {
    const { hashtag } = req.body;
    const hashtagId = checkHashtag(req, res, hashtag);
    models.tutorial
      .update(tutorial)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          // fonction delete tuto_hashtag by tuto_id
          models.tuto_hashtag
            .deleteLinesForTutoEdit(tutorial.id)
            .then(() => {
              // fonction insert tuto_hashtag by tuto_id
              models.tuto_hashtag
                .insert(hashtagId, tutorial.id)
                .then(() => {})
                .catch((err) => {
                  console.error(err);
                  res.sendStatus(500);
                });
              res.sendStatus(204);
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const editOnline = (req, res) => {
  const tutorial = req.body;
  tutorial.id = parseInt(req.params.id, 10);

  models.tutorial
    .updateOnline(tutorial)
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

const add = (req, res) => {
  const tutorial = req.body;

  if (req.body.admin !== 1) {
    res.sendStatus(403);
  } else {
    const { hashtag } = req.body;
    const hashtagId = checkHashtag(req, res, hashtag);
    models.tutorial
      .insert(tutorial)
      .then(([result]) => {
        models.tuto_hashtag
          .insert(hashtagId, result.insertId)
          .then(() => {})
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
        res.status(201).json({
          id: result.insertId,
          location: `/tutorial/${result.insertId}`,
        });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const destroy = (req, res) => {
  models.tutorial
    .delete(req.params.id)
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
  browse,
  read,
  edit,
  editOnline,
  add,
  destroy,
};
