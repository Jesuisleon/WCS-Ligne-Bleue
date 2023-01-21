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

  findAllJourneysForUser(userId) {
    return this.connection.query(
      `select tutorial_id from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findAllJourneysForTutorial(tutorialId) {
    return this.connection.query(
      `select user_id from ${this.table} where tutorial_id = ?`,
      [tutorialId]
    );
  }

  deleteJourneyForUser(userId, tutorialId) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ? and tutorial_id = ?`,
      [userId, tutorialId]
    );
  }

  deleteAllJourneysForUser(userId) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  deleteAllJourneysForTutorial(tutorialId) {
    return this.connection.query(
      `delete from ${this.table} where tutorial_id = ?`,
      [tutorialId]
    );
  }
}

module.exports = JourneyManager;
