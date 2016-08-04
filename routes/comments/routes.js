var express = require('express');
var router = express.Router();
var path = require('path')
var escaper = require('validator/lib/escape')
var models = require('../../models')
var Comment = models.comment
var commentsController = require('./controller')

router.get('/comments', (req, res, next) => {
  commentsController.index(req, res, next)
})

router.get('/comments/new', (req, res, next) => {
  commentsController.newComment(req, res, next)
})

router.post('/comments', (req, res, next) => {
  commentsController.createComment(req, res, next)
})

router.get('/comments/:id', (req, res, next) => {
  commentsController.showComment(req, res, next)
})

router.get('/comments/:id/edit', (req, res, next) => {
  commentsController.editComment(req, res, next)
})

router.post('/comments/:id', (req, res, next) => {
  commentsController.updateComment(req, res, next)
})

router.get('/comments/:id/delete', (req, res, next) => {
  commentsController.deleteComment(req, res, next)
})

module.exports = router
