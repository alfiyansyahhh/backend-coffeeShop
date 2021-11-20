const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const usersModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select * from users  
        WHERE username LIKE "%${search}%" 
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
    db.query(`select * from users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body, pass, filename) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (
      username,password,picture,display_name,first_name,last_name,
      ttgl,gender,email_address,phone_number,delivery_address
      ) VALUE (
        '${body.username}','${pass}','${filename}','${body.display_name}','${body.first_name}',
        '${body.last_name}','${body.ttgl}','${body.gender}','${body.email_address}','${body.phone_number}','${body.delivery_address}'
      )`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  register: (body, pass) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username,password,picture,email_address,phone_number,level)
        VALUE (
          '${body.username}','${pass}','${'images.jpg'}','${body.email_address}','${body.phone_number}','${body.level}'
        )`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  cekUsername: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}' || email_address='${body.username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  cekUsernameRegis: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  cekEmail: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where email_address='${body.email_address}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  update: (body, id, hashpassword, filename, resultDetail) => new Promise((resolve, reject) => {
    db.query(
      `update users set  username='${body.username}',password='${hashpassword}',picture='${filename}',
      display_name='${body.display_name}',first_name='${body.first_name}',last_name='${body.last_name}',
      ttgl='${body.ttgl}',gender='${body.gender}',email_address='${body.email_address}',phone_number='${body.phone_number}',
      delivery_address='${body.delivery_address}' where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const filelama = resultDetail.map((e) => e.picture);
          if (filelama !== 'images.jpg') {
            const pathfile = path.join(__dirname, `../../uploads/${filelama}`);
            fs.unlink(pathfile, (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          resolve(result);
        }
      },
    );
  }),
  delete: (id, resultDetail) => new Promise((resolve, reject) => {
    const filelama = resultDetail.map((e) => e.picture);
    db.query(`delete from users where id='${id}'`, (err, result) => {
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

module.exports = usersModel;
