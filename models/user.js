module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    }
  })
  return User
}
