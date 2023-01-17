const AbstractManager = require("./AbstractManager");

class TutoHashtagManager extends AbstractManager {
  constructor() {
    super({ table: "tuto_hashtag" });
  }

  findTutorialHashtag(id) {
    return this.connection.query(
      `select th.hashtag_id as hashtagId, h.text as hashtagText from ${this.table} as th inner join hashtag as h on h.id = th.hashtag_id where th.tutorial_id = ?`,
      [id]
    );
  }

  insert(hashtags, idTuto) {
    const separator = ", ";
    let query = `INSERT INTO ${
      this.table
    } (tutorial_id, hashtag_id) VALUES ${hashtags.reduce((acc, hashtag) => {
      return `${acc}(${idTuto}, ${hashtag})${separator}`;
    }, "")}`;
    query = query.substring(0, query.length - 2);
    return this.connection.query(`${query}`);
  }

  deleteLinesForTutoEdit(id) {
    return this.connection.query(
      `delete from ${this.table} where tutorial_id = ?`,
      [id]
    );
  }
}

module.exports = TutoHashtagManager;
