
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('comment', {
    name: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }
  })
  return Comment
}
