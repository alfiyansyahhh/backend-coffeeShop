const jwt = require('jsonwebtoken');
const { failed } = require('../helpers/respon');

const authentication = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      failed(res, 401, err);
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = authentication;
