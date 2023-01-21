const AbstractManager = require("./AbstractManager");

class RatingManager extends AbstractManager {
  constructor() {
    super({ table: "rating" });
  }

  insert(rating) {
    return this.connection.query(
      `insert into ${this.table} (user_id, tutorial_id, rating) values (?, ?, ?)`,
      [rating.userId, rating.tutorialId, rating.rating]
    );
  }

  findAllForTutorial(tutorialId) {
    return this.connection.query(
      `select rating from ${this.table} where tutorial_id = ?`,
      [tutorialId]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select rating from ${this.table} where user_id = ?`,
      [userId]
    );
  }
}
module.exports = RatingManager;
