const express = require('express');
const categoryController = require('../controllers/Category');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const categoryRouter = express.Router();
categoryRouter
  .get('/category', authen, author.isAdmin, categoryController.getList)
  .get('/category/:id', authen, author.isAdmin, categoryController.getDetails)
  .post('/category', authen, author.isAdmin, categoryController.insert)
  .put('/category/:id', authen, author.isAdmin, categoryController.update)
  .delete('/category/:id', authen, author.isAdmin, categoryController.delete);

module.exports = categoryRouter;
