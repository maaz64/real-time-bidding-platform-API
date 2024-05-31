const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL_TEST, {
    dialect: 'mysql',
    logging: false,
  });

module.exports = {
  sequelize,
};
