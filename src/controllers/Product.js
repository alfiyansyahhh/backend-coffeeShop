const _ = require('lodash');
const productModel = require('../models/Product');
const { success, failed } = require('../helpers/respon');
const redisAction = require('../helpers/redis');

const product = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id_product' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      // eslint-disable-next-line radix
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      // eslint-disable-next-line eqeqeq
      const offset = page === 1 ? 0 : (page - 1) * limit;
      redisAction.get('product', (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          productModel.getList(search, field, typeSort, limit, offset).then(async (result2) => {
            const allData = await productModel.getAll();
            const output = {
              data: result2,
              totalPage: Math.ceil(allData.length / limit),
              search,
              limit,
              page,
            };
            redisAction.set('product', JSON.stringify(allData), (error) => {
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
          const dataFiltered = _.filter(response, (e) => e.product_name.includes(search));
          const paginate = _.slice(dataFiltered, offset, offset + limit);
          const output = {
            data: paginate,
            search,
            limit,
            page,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, 'succes');
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      productModel.getDetails(id).then((result) => {
        success(res, result[0], 'succes');
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
      const { filename } = req.file;
      productModel.insert(body, filename).then((result) => {
        redisAction.del('product', (err) => {
          if (err) {
            failed(res, 401, err);
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
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      let file = 'images.jpg';
      if (req.file === undefined) {
        productModel.getDetails(id).then((result) => {
          file = result[0].picture;
        }).catch((err) => {
          failed(res, 500, err);
        });
      } else {
        file = req.file.filename;
      }
      productModel.getDetails(id).then((resultDetail) => {
        productModel.update(body, id, file, resultDetail).then((result) => {
          redisAction.del('product', (err) => {
            if (err) {
              failed(res, 401, err);
            }
          });
          success(res, result, 'succes');
        }).catch((err) => {
          failed(res, 500, err);
        });
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      productModel.getDetails(id).then((resultDetail) => {
        productModel.delete(id, resultDetail).then((result) => {
          redisAction.del('product', (err) => {
            if (err) {
              failed(res, 401, err);
            }
          });
          success(res, result, 'succes');
        }).catch((err) => {
          failed(res, 500, err);
        });
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = product;
