var express = require('express');
var router = express.Router();
var db = require('../../models')
var Comment = db.comment
var commentsController = require('./controller')

Comment.sync({force: false})

router.get('/', (req, res, next) => {
  commentsController.index(req, res, next)
})

router.get('/new', (req, res, next) => {
  commentsController.newComment(req, res, next)
})

router.post('/', (req, res, next) => {
  commentsController.createComment(req, res, next)
})

router.get('/:id', (req, res, next) => {
  commentsController.showComment(req, res, next)
})

router.get('/:id/edit', (req, res, next) => {
  commentsController.editComment(req, res, next)
})

router.post('/:id', (req, res, next) => {
  commentsController.updateComment(req, res, next)
})

router.get('/:id/delete', (req, res, next) => {
  commentsController.deleteComment(req, res, next)
})

module.exports = router
