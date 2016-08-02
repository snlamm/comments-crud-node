Sequelize = require('sequelize')

var sequelizeConfig = new Sequelize('first_db', process.env.DB_USER, process.env.DB_PASS, {
  process: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelizeConfig
