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

  findAverageRatingForTuto(id) {
    return this.connection.query(
      `select AVG(rating) as rating from ${this.table} where tutorial_id = ? and rating IS NOT NULL`,
      [id]
    );
  }

  findAllCommentsForTuto(id) {
    return this.connection.query(
      `select uj.user_id, u.firstname, u.lastname, u.email, uj.tutorial_id, uj.comment, uj.rating, uj.creation_date, t.title from ${this.table} as uj join user as u on u.id=uj.user_id join tutorial as t on t.id = uj.tutorial_id where uj.tutorial_id = ? and comment IS NOT NULL`,
      [id]
    );
  }
}

module.exports = JourneyManager;
