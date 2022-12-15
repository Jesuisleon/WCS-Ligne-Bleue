const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findUser(id) {
    return this.connection.query(
      `select firstname, lastname, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllUsers() {
    return this.connection.query(
      `select firstname, lastname, email from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email,hashedPassword) values (?,?,?,?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ? where id = ?`,
      [user.firstname, user.lastname, user.email, user.id]
    );
  }

  getUserByEmail(email) {
    return this.connection.query(
      `select email, hashedPassword, id from ${this.table} where email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
