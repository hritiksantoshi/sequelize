const config = require("./config/config");
const sequelize = require("./connection/connect")
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const {errorConverter,errorHandler}  = require('./middlewares/error')
const app = express();
const server = require('http').createServer(app);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/v1', routes);
app.use(errorConverter);
app.use(errorHandler);
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    server.listen(config.port, () => {
        console.log(`Running on port ${config.port}.`);})
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  // sequelize.sync({alter:true});