/* eslint-disable */
const db = require('../config/pg');

const recipeModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipes WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  createRecipe: ({ title, ingredients, image, video }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO recipes (title, ingredients, image, video) VALUES
        ('${title}', '${ingredients}', '${image}', '${video}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  updateRecipe: ({ id, title, ingredients }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipes SET title='${title}', ingredients='${ingredients}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipes WHERE id=${id}`, (err, result) => {
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
        `SELECT * FROM recipes ORDER BY name ASC LIMIT ${limit} OFFSET ${offset}`,
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
      db.query(`SELECT * FROM recipes ORDER BY title ASC`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  sortDesc: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipes ORDER BY title DESC`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  searchByTitle: (title) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipes WHERE title LIKE '%${title}%'`,
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
        `SELECT * FROM recipes WHERE title LIKE '%${character}%'`,
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

module.exports = recipeModel;
