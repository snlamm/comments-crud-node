var express = require('express');
var router = express.Router();
var db = require('../../models')
var Comment = db.comment
var commentsController = require('./controller')

Comment.sync({force: false})

// router.get('/', (req, res, next) => {
//   commentsController.index(req, res, next)
// })

router.get('/', (ignore, res) => {
  commentsController.getAllComments()
    .then(function (comments) {
        res.json(comments);
    })
    .catch({code: 404}, function (err) {
        console.log("err", err);
        res.sendStatus(404);
    })
    .catch(function (err) {
        console.log("err", err);
        res.sendStatus(500);
    })
});

router.get('/new', (req, res, next) => {
  commentsController.newComment(req, res, next)
})

router.post('/', (req, res) => {
  const load = req.body;

  commentsController.createComment(load)
    .then(function (comments) {
        // res.sendStatus(201);
        res.redirect('/comments');
    })
    .catch({code: 400}, function (err) {
        console.log("err", err);
        res.sendStatus(400);
    })
    .catch({code: 404}, function (err) {
        console.log("err", err);
        res.sendStatus(404);
    })
    .catch(function (err) {
        console.log("err", err);
        res.sendStatus(500);
    })
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
