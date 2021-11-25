const transactionModel = require('../models/Transaction');
const { success, failed } = require('../helpers/respon');
const redisAction = require('../helpers/redis');

const transaction = {
  getList: (req, res) => {
    try {
      redisAction.get('transaction', (err, result) => {
        if (err) {
          failed(res, 500, err);
        } else if (!result) {
          transactionModel.getList().then(async (result1) => {
            const allData = await transactionModel.getAll();
            const output = { data: result1 };
            redisAction.set('transaction', JSON.stringify(allData), (error) => {
              if (error) {
                failed(res, 401, error);
              }
            });
            success(res, output, 'succes');
          }).catch((error) => {
            failed(res, 500, error);
          });
        } else {
          const response = JSON.parse(result);
          success(res, response, 'succes');
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      transactionModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getTransaction: (req, res) => {
    try {
      const id = req.userId;
      transactionModel.getTransaction(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      transactionModel.insert(body).then((result) => {
        redisAction.del('transaction', (err) => {
          console.log('redis');
          if (err) {
            failed(res, 401, err);
            console.log(body);
          }
        });
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = transaction;
