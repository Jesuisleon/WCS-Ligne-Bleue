const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
  constructor() {
    super({ table: "theme" });
  }

  insert(theme) {
    return this.connection.query(
      `insert into ${this.table} (name, icon) values (?,?)`,
      [theme.name, theme.icon]
    );
  }
}

module.exports = ThemeManager;
