/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');

const port = process.env.PORT || 3001;

const userRouter = require('./src/router/user.router');
const recipeRouter = require('./src/router/recipe.router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(xss());

app.use(userRouter);
app.use(recipeRouter);

app.get('/', (req, res) => {
  res.send('Connect to express successfully');
});

app.listen(port, () => {
  console.log(`SERVER LISTENING ON PORT ${port}`);
});
