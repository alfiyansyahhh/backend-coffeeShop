const _ = require('lodash');
const categoryModel = require('../models/Category');
const { success, failed } = require('../helpers/respon');
const redisAction = require('../helpers/redis');

const category = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      // eslint-disable-next-line radix
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      // eslint-disable-next-line eqeqeq
      const offset = page === 1 ? 0 : (page - 1) * limit;
      redisAction.get('category', (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          categoryModel.getList(search, field, typeSort, limit, offset).then(async (result1) => {
            const allData = await categoryModel.getAll();
            const output = {
              data: result1,
              totalPage: Math.ceil(allData.length / limit),
              search,
              limit,
              page,
            };
            redisAction.set('category', JSON.stringify(allData), (error) => {
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
          const dataFiltered = _.filter(response, (e) => e.category.includes(search));
          const paginate = _.slice(dataFiltered, offset, offset + limit);
          const output = {
            data: paginate,
            search,
            limit,
            page: query.page,
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
      categoryModel.getDetails(id).then((result) => {
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
      categoryModel.insert(body).then((result) => {
        redisAction.del('category', (error) => {
          if (error) {
            failed(res, 401, error);
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
      categoryModel.update(body, id).then((result) => {
        redisAction.del('category', (error) => {
          if (error) {
            failed(res, 401, error);
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
  delete: (req, res) => {
    try {
      const { id } = req.params;
      categoryModel.delete(id).then((result) => {
        redisAction.del('category', (error) => {
          if (error) {
            failed(res, 401, error);
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

module.exports = category;
