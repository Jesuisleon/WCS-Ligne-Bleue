const AbstractManager = require("./AbstractManager");

class JourneyManager extends AbstractManager {
  constructor() {
    super({ table: "user_journey" });
  }

  insert(journey) {
    return this.connection.query(
      `insert into ${this.table} (user_id, tutorial_id) values (?, ?)`,
      [journey.userId, journey.tutorialId]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select tutorial_id from ${this.table} where user_id = ?`,
      [userId]
    );
  }
}

module.exports = JourneyManager;
