/* eslint-disable */
const db = require('../config/pg');

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  registerUser: ({ name, email, phone, password, level, image }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, email, phone, password, level, image)
      VALUES ('${name}', '${email}', '${phone}', '${password}',
      ${level}, '${image}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  loginUser: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  update: ({ name, email, phone, id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET name='${name}', email='${email}',
      phone='${phone}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  paginate: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ORDER BY name ASC LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  sortAsc: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users ORDER BY name ASC`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  sortDesc: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users ORDER BY name DESC`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  searchByName: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name LIKE '%${name}%'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  searchByCharacter: (character) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name LIKE '%${character}%'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  loginData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT email, password FROM users`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  myRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.name, recipes.title FROM users INNER JOIN recipes ON users.id = recipes.id`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = userModel;
