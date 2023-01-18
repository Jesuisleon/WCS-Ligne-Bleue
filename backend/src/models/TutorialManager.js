const AbstractManager = require("./AbstractManager");

class TutorialManager extends AbstractManager {
  constructor() {
    super({ table: "tutorial" });
  }

  findTutorial(id) {
    return this.connection.query(
      `select id,theme_id, difficulty, title, objective,description, step, author, published,  creation_date, edition_date from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllTutorials(where) {
    return this.connection.query(
      `select id,theme_id, difficulty, title, objective,description, step, author, published,  creation_date, edition_date from  ${this.table}${where}`
    );
  }

  findAllTutorialsForSearch() {
    return this.connection.query(
      `select tutorial.id,tutorial.theme_id, theme.name as theme, tutorial.title, tutorial.description, tutorial.published from ${this.table} inner join theme on theme.id = tutorial.theme_id`
    );
  }

  insert(tutorial) {
    return this.connection.query(
      `insert into ${this.table} (theme_id, difficulty, title, objective,description, step, author, published) values (?,?,?,?,?,?,?,?)`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.step,
        tutorial.author,
        tutorial.published,
      ]
    );
  }

  update(tutorial) {
    return this.connection.query(
      `update ${this.table} set theme_id = ?, difficulty = ?, title = ?, objective = ?,description = ?, step = ?, author = ?, published = ?, edition_date = NOW() where id = ?`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.step,
        tutorial.author,
        tutorial.published,
        tutorial.id,
      ]
    );
  }

  updateOnline(tutorial) {
    return this.connection.query(
      `update ${this.table} set published = ?, edition_date = NOW() where id = ?`,
      [tutorial.published, tutorial.id]
    );
  }
}

module.exports = TutorialManager;
