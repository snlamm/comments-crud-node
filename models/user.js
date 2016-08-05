var sequelize = require('../database/config')

var User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  }
})

User.sync({force: false})

module.exports = User


// ,
// validate: {
//   notEmpty: true
// },
// allowNull: false,
// unique: true
