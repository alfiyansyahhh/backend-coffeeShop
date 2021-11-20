const express = require('express');
const productController = require('../controllers/Product');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');
const upload = require('../middleware/upload');

const productRouter = express.Router();
productRouter
  .get('/product', productController.getList)
  .get('/product/:id', authen, productController.getDetails)
  .post('/product', authen, author.isAdmin, upload, productController.insert)
  .put('/product/:id', authen, author.isAdmin, upload, productController.update)
  .delete('/product/:id', authen, author.isAdmin, upload, productController.delete);

module.exports = productRouter;
