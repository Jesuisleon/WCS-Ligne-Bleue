const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
  constructor() {
    super({ table: "difficulty" });
  }

  findAllName() {
    return this.connection.query(`select * from ${this.table}`);
  }

  insert(difficulty) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [difficulty.name]
    );
  }
}

module.exports = ThemeManager;
