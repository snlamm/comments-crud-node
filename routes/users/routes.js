var express = require('express');
var router = express.Router();
var db = require('../../models')
var User = db.user
var usersController = require('./controller')

User.sync({force: false})

router.get('/', (req, res, next) => {
  usersController.index(req, res, next)
})

router.get('/new', (req, res, next) => {
  usersController.newUser(req, res, next)
})

router.post('/', (req, res, next) => {
  usersController.createUser(req, res, next)
})

router.get('/:id', (req, res, next) => {
  usersController.showUser(req, res, next)
})

router.get('/:id/edit', (req, res, next) => {
  usersController.editUser(req, res, next)
})

router.post('/:id/update', (req, res, next) => {
  usersController.updateUser(req, res, next)
})

router.get('/:id/delete', (req, res, next) => {
  usersController.deleteUser(req, res, next)
})


module.exports = router
