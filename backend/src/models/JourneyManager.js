/* eslint-disable no-param-reassign */
const AbstractManager = require("./AbstractManager");

class JourneyManager extends AbstractManager {
  constructor() {
    super({ table: "user_journey" });
  }

  insert(journey) {
    if (!journey.comment) {
      journey.comment = null;
    }
    if (!journey.rating) {
      journey.rating = null;
    }

    return this.connection.query(
      `insert into ${this.table} (user_id, tutorial_id, rating, comment) values (?, ?, ?, ?)`,
      [journey.userId, journey.tutorialId, journey.rating, journey.comment]
    );
  }

  findAllForUser(userId) {
    return this.connection.query(
      `select tutorial_id, rating, comment from ${this.table} where user_id = ?`,
      [userId]
    );
  }
}

module.exports = JourneyManager;
