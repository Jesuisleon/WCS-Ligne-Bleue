const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
  constructor() {
    super({ table: "difficulty" });
  }

  findAllName() {
    return this.connection.query(`select * from ${this.table}`);
  }
}

module.exports = ThemeManager;
