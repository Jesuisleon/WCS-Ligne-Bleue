const AbstractManager = require("./AbstractManager");

class TutorialManager extends AbstractManager {
  constructor() {
    super({ table: "tutorial" });
  }

  findTutorial(id) {
    return this.connection.query(
      `select id,theme_id, difficulty, title, objective,description, step, hashtag, author, online, creation_date, edition_date from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllTutorials(where) {
    return this.connection.query(
      `select id,theme_id, difficulty, title, objective,description, step, hashtag, author, online,  creation_date, edition_date from  ${this.table}${where}`
    );
  }

  insert(tutorial) {
    return this.connection.query(
      `insert into ${this.table} (theme_id, difficulty, title, objective,description, step, hashtag, author, online) values (?,?,?,?,?,?,?,?,?)`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.step,
        tutorial.hashtag,
        tutorial.author,
        tutorial.online,
      ]
    );
  }

  update(tutorial) {
    return this.connection.query(
      `update ${this.table} set theme_id = ?, difficulty = ?, title = ?, objective = ?,description = ?, step = ?, hashtag = ?, author = ?, online = ?, edition_date = NOW() where id = ?`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.step,
        tutorial.hashtag,
        tutorial.author,
        tutorial.online,
        tutorial.id,
      ]
    );
  }
}

module.exports = TutorialManager;
