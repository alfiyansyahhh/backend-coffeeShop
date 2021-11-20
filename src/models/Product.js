const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const productModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(
      `SELECT id_product,picture,product_name,price,category,categoryID,ket 
        from product left join category on product.categoryID=category.id`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select id_product,picture,product_name,price,category,categoryID,ket
        from product left join category on product.categoryID=category.id 
        WHERE product_name LIKE "%${search}%" 
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
    db.query(
      `select id_product,picture,product_name,price,category,categoryID,ket
        from product left join category on product.categoryID=category.id 
        where id_product='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  insert: (body, filename) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO product (picture,product_name,price,categoryID,ket) 
        VALUE ('${filename}','${body.product_name}','${body.price}','${body.category}','${body.ket}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  update: (body, id, filename, resultDetail) => new Promise((resolve, reject) => {
    db.query(`update product set picture='${filename}',product_name='${body.product_name}',price='${body.price}',categoryID='${body.category}',
    ket='${body.ket}' where id_product='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const filelama = resultDetail.map((e) => e.picture);
        const pathfile = path.join(__dirname, `../../uploads/${filelama}`);
        fs.unlink(pathfile, (error) => {
          if (error) {
            reject(error);
          }
        });
        resolve(result);
      }
    });
  }),
  delete: (id, resultDetail) => new Promise((resolve, reject) => {
    const filelama = resultDetail.map((e) => e.picture);
    db.query(`delete from product where id_product='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const pathfile = path.join(__dirname, `../../uploads/${filelama}`);
        fs.unlink(pathfile, (error) => {
          if (error) {
            reject(error);
          }
        });
        resolve(result);
      }
    });
  }),
};

module.exports = productModel;
