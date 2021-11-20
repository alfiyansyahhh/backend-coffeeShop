const express = require('express');
const transactiontController = require('../controllers/Transaction');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const transactiontRouter = express.Router();
transactiontRouter
  .get('/transaction', authen, author.isAdmin, transactiontController.getList)
  .get('/transaction/:id', authen, transactiontController.getDetails)
  .get('/transactionUser', authen, transactiontController.getTransaction)
  .post('/transaction', authen, transactiontController.insert);
module.exports = transactiontRouter;
