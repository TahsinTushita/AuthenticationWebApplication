const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(name, email, password)
            values(?, ?, ?)`,
      [data.name, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      "select id, name, email from users",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      "select id, name, email from users where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set name=?, password=? where id=?`,
      [data.name, data.password, data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where id=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from users where email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
};
