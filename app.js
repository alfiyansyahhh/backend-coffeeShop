const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./src/routers/Users');
const categoryRouter = require('./src/routers/Category');
const productRouter = require('./src/routers/Product');
const transactionRouter = require('./src/routers/Transaction');

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(usersRouter);
app.use(categoryRouter);
app.use(transactionRouter);
app.use(productRouter);
app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  res.json({
    succes: true,
    msg: 'it works',
  });
});

app.listen(PORT, () => {
  console.log(`service running on port ${PORT}`);
});

module.exports = app;
