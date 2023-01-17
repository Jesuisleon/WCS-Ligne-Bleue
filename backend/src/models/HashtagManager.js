const AbstractManager = require("./AbstractManager");

class HashtagManager extends AbstractManager {
  constructor() {
    super({ table: "hashtag" });
  }

  findHashtag(hashtag) {
    return this.connection.query(`select * from ${this.table} where text = ?`, [
      hashtag,
    ]);
  }

  insert(hashtag) {
    return this.connection.query(
      `insert into ${this.table} (text) values (?)`,
      [hashtag]
    );
  }
}

module.exports = HashtagManager;
