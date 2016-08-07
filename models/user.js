module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    }
  },{
    classMethods: {
      associate: function(models){
        User.hasMany(models.comment);
      }
    }
  })
  return User
}
