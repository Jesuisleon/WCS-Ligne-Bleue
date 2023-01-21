const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(comment) {
    return this.connection.query(
      `insert into ${this.table} (user_id, tutorial_id, comment) values (?, ?, ?)`,
      [comment.userId, comment.tutorialId, comment.comment]
    );
  }

  findAllForTutorial(tutorialId) {
    return this.connection.query(
      `select comment from ${this.table} where tutorial_id = ?`,
      [tutorialId]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select comment from ${this.table} where user_id = ?`,
      [userId]
    );
  }
}

module.exports = CommentManager;
