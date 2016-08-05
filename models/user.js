module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    }
  })
  return User
}

// module.exports = User


// ,
// validate: {
//   notEmpty: true
// },
// allowNull: false,
// unique: true
