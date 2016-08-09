const toInt = require('validator/lib/toInt')
const db = require('../../models')
const User = db.user
const Comment = db.comment


var index = (req, res, next) => {
  // TODO: order by name
  User.findAll({
    order: ['name']
  }).then((users) => {
    res.render('users/index', {users: users})
  })
}

var showUser = (req, res, next) => {
  User.findById(req.params.id, {
    include: [{model: Comment}]
  }).then((user) => {
    res.render('users/show', {user: user})
  })
}

var newUser = (req, res, next) => {
  res.render('users/new')
}

var createUser = (req, res, next) => {
  let user = req.body
  let name = user["name"]
  User.create({
    name: name
  })
  .then((user) => {
    res.redirect(`/users/${user.id}`)
  })
}

var editUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    res.render('users/edit', {user: user})
  })
}

var updateUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    let userUpdate = req.body
    let name = userUpdate["name"]
    user.update({
      name: name
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`)
    })
  })
}

var deleteUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    user.destroy()
    .then(() => {
      res.redirect('/users')
    })
  })
}

module.exports = {
  index: index,
  showUser: showUser,
  newUser: newUser,
  createUser: createUser,
  editUser: editUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
