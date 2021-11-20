const { failed } = require('../helpers/respon');
const usersModel = require('../models/Users');

const authorization = {
  isAdmin: (req, res, next) => {
    const id = req.userId;
    usersModel.getDetails(id).then((result) => {
      if (result[0].level === 0) {
        next();
      } else {
        failed(res, 10, 'hanya admin');
      }
    }).catch((err) => {
      failed(res, 500, err);
    });
  },

};

module.exports = authorization;
