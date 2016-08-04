var models = require('../../models')
var User = models.user

var newUser = (req, res, next) => {
  res.render('users/new')
}
module.exports = {
  newUser: newUser
}
