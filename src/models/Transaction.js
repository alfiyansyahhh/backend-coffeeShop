const db = require('../config/db');

const transactionModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query(
      `select dt.id,id_user,u.display_name,alamat,payment,shipping,subtotal,tax,total,
        p.id_product,p.price,product_name,category,p.categoryID 
        from details_transaction as dt
        left join transaction as t on dt.id_masterTransaction=t.id 
        left join users as u on t.id_user=u.id 
        left join product as p on dt.id_product=p.id_product 
        left join category as c on p.categoryID=c.id`, (err, result) => {
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
      `select dt.id,id_user,u.display_name,alamat,payment,shipping,subtotal,tax,total,p.id_product,p.price,product_name,category,p.categoryID 
        from details_transaction as dt
        left join transaction as t on dt.id_masterTransaction=t.id 
        left join users as u on t.id_user=u.id 
        left join product as p on dt.id_product=p.id_product 
        left join category as c on p.categoryID=c.id
            WHERE u.username || u.display_name LIKE "%${search}%" 
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
    db.query(`SELECT details_transaction.id,id_masterTransaction,picture,product_name,details_transaction.price,ket,category,qty
    from details_transaction left join product on details_transaction.id_product=product.id_product left join category 
    on product.categoryID=category.id where id_masterTransaction='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  }),
  getTransaction: (id) => new Promise((resolve, reject) => {
    db.query(`select * from transaction where id_user='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO transaction (id_user,penerima,alamat,phone_number,payment,shipping,subtotal,tax,total) 
    VALUE ('${body.id_user}','${body.penerima}','${body.alamat}','${body.phone_number}','${body.payment}','${body.shipping}','${body.subtotal}',
        '${body.tax}','${body.total}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const data = result;
        const { details } = body;
        // eslint-disable-next-line array-callback-return
        const insertDetails = details.map((e) => {
          db.query(`INSERT INTO details_transaction (id_masterTransaction,id_product,price,qty) 
            VALUE ('${data.insertId}','${e.id_product}',
            '${e.price}','${e.qty}')`, (error) => {
            if (error) {
              reject(error);
            } else {
              // eslint-disable-next-line no-useless-return
              return;
            }
          });
        });
        Promise.all(insertDetails).then(() => {
          resolve(result);
        }).catch((err2) => {
          reject(err2);
        });
      }
    });
  }),
};

module.exports = transactionModel;
