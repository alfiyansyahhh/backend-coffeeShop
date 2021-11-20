const db = require('../config/db');

const categoryModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('select * from category', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select * from category 
        WHERE category LIKE "%${search}%" 
        ORDER BY ${field} ${typeSort}
        LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from category where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO category (category) VALUE ('${body.category}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (body, id) => new Promise((resolve, reject) => {
    db.query(`update category set category='${body.category}' where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from category where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = categoryModel;
