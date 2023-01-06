const AbstractManager = require("./AbstractManager");

class TutorialManager extends AbstractManager {
  constructor() {
    super({ table: "tutorial" });
  }

  findTutorial(id) {
    return this.connection.query(
      `select id, difficulty, title, objective,description, content, hashtag, author, creation_date, edition_date from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllTutorials(where) {
    return this.connection.query(
      `select id, difficulty, title, objective,description, content, hashtag, author, creation_date, edition_date from  ${this.table}${where}`
    );
  }

  findTutorialsByTheme(theme) {
    return this.connection.query(
      `select id, difficulty, title, objective,description, content, hashtag, author from  ${this.table} where theme = ?`,
      [theme]
    );
  }

  insert(tutorial) {
    return this.connection.query(
      `insert into ${this.table} (themeID, difficulty, title, objective,description, content, hashtag, author) values (?,?,?,?,?,?,?,?)`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.content,
        tutorial.hashtag,
        tutorial.author,
      ]
    );
  }

  update(tutorial) {
    return this.connection.query(
      `update ${this.table} set themeid = ?, difficulty = ?, title = ?, objective = ?,description = ?, content = ?, hashtag = ?, author = ?, edition_date = NOW() where id = ?`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.content,
        tutorial.hashtag,
        tutorial.author,
        tutorial.id,
      ]
    );
  }
}

module.exports = TutorialManager;
