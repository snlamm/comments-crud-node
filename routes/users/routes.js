var express = require('express');
var router = express.Router();
var models = require('../../models')
var User = models.user
var usersController = require('./controller')

router.get('/new', (req, res, next) => {
  usersController.newUser(req, res, next)
})

router.post('/', (req, res, next) => {
  
})

module.exports = router
