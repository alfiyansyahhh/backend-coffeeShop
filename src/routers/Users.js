const express = require('express');
const usersController = require('../controllers/Users');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');
const upload = require('../middleware/upload');

const usersRouter = express.Router();
usersRouter
  .get('/users', authen, author.isAdmin, usersController.getList)
  .post('/login', usersController.login)
  .get('/users/:id', authen, usersController.getDetails)
  .post('/users', upload, usersController.insert)
  .post('/register', usersController.register)
  .put('/users/:id', authen, upload, usersController.update)
  .delete('/users/:id', authen, usersController.delete);

module.exports = usersRouter;
