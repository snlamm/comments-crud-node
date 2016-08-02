var express = require('express');
var router = express.Router();
var path = require('path')
var sequelize = require('../../database/config')
var escaper = require('validator/lib/escape')

var Comment = sequelize.define('comment', {
  name: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
})

Comment.sync({force: false})
// User.sync({force: false}).then(function () {
//   // Table created
// });

router.get('/comments', (req, res, next) => {
  Comment.findAll().then((comments) => {
    res.render('comments/index', {comments: comments})
  })
})


router.get('/comments/new', (req, res, next) => {
  res.render('comments/new')
})

router.post('/comments', (req, res, next) => {
  let comment = req.body
  console.log(comment)
  let name = escaper(comment["name"])
  let content = escaper(comment["content"])
  Comment.create({
    name: name,
    content: content
  })
  res.redirect('/comments')
})

router.get('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render('comments/show', {comment: comment})
  })
})

router.get('/comments/:id/edit', (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render('comments/edit', {comment: comment})
  })
})

router.post('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    let commentUpdate = req.body
    let name = escaper(commentUpdate["name"])
    let content = escaper(commentUpdate['content'])
    console.log("HELLOOOOO")
    comment.update({
      name: name,
      content: content
    })
    .then((comment) => {res.redirect(`/comments/${comment.id}`)})
  })
})

router.get('/comments/:id/delete', (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    comment.destroy()
    res.redirect('/comments')
  })
})

// the below is an equivalent way to render index.hbs
// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname + '/../../views/index.html'))
// })

module.exports = router
