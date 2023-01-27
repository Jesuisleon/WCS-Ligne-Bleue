const AbstractManager = require("./AbstractManager");

class TutorialManager extends AbstractManager {
  constructor() {
    super({ table: "tutorial" });
  }

  findTutorial(id) {
    return this.connection.query(
      `select t.id,t.theme_id, t.difficulty_id, d.name as difficulty_name, t.title, t.objective,t.description, t.step, t.author, t.published, t.creation_date, t.edition_date from  ${this.table} as t inner join difficulty as d on d.id=t.difficulty_id where t.id = ?`,
      [id]
    );
  }

  // added Theme name in request
  findAllTutorials(where) {
    return this.connection.query(
      `select t.id,t.theme_id,theme.name as theme_name, t.difficulty_id, d.name as difficulty_name, t.title, t.objective,t.description, t.step, t.author, t.published, t.creation_date, t.edition_date from  ${this.table} as t inner join difficulty as d on d.id=t.difficulty_id inner join theme on t.theme_id=theme.id${where}`
    );
  }

  findAllTutorialsForSearch() {
    return this.connection.query(
      `select tutorial.id,tutorial.theme_id, theme.name as theme, tutorial.title, tutorial.description, tutorial.published from ${this.table} inner join theme on theme.id = tutorial.theme_id`
    );
  }

  insert(tutorial) {
    return this.connection.query(
      `insert into ${this.table} (theme_id, difficulty_id, title, objective,description, step, author, published) values (?,?,?,?,?,?,?,?)`,
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
      `update ${this.table} set theme_id = ?, difficulty_id = ?, title = ?, objective = ?,description = ?, step = ?, author = ?, edition_date = NOW() where id = ?`,
      [
        tutorial.theme,
        tutorial.difficulty,
        tutorial.title,
        tutorial.objective,
        tutorial.description,
        tutorial.step,
        tutorial.author,
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

  findAllTutorialsAndSayIfValidated(userId) {
    return this.connection.query(
      `SELECT tutorial.id, tutorial.theme_id, tutorial.title, user_Journey.user_id
      FROM ${this.table} left JOIN user_journey ON tutorial.id = user_Journey.tutorial_id and user_Journey.user_id = ? `,
      [userId]
    );
  }
}

module.exports = TutorialManager;
