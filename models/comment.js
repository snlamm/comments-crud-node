
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('comment', {
    name: {
      type: DataTypes.STRING
    },
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
