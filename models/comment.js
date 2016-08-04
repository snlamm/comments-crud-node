var sequelize = require('../database/config')

var Comment = sequelize.define('comment', {
  name: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
})

Comment.sync({force: false})

module.exports = Comment
