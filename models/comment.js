
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('comment', {
    content: {
      type: DataTypes.STRING
    }
  },
  {
    classMethods: {
      associate: function(models){
        Comment.belongsTo(models.user);
      }
    }
  })
  return Comment
}
