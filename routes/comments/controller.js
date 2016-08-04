var escaper = require('validator/lib/escape')
var models = require('../../models')
var Comment = models.comment


var index = (req, res, next) => {
  Comment.findAll().then((comments) => {
    res.render('comments/index', {comments: comments})
  })
}

var newComment = (req, res, next) => {
  res.render('comments/new')
}

var createComment = (req, res, next) => {
  let comment = req.body
  console.log(comment)
  let name = escaper(comment["name"])
  let content = escaper(comment["content"])
  Comment.create({
    name: name,
    content: content
  })
  .then(() => {
    res.redirect('/comments')
  })
}

var showComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render('comments/show', {comment: comment})
  })
}

var editComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    res.render('comments/edit', {comment: comment})
  })
}

var updateComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    let commentUpdate = req.body
    let name = escaper(commentUpdate["name"])
    let content = escaper(commentUpdate['content'])
    comment.update({
      name: name,
      content: content
    })
    .then((comment) => {
      res.redirect(`/comments/${comment.id}`)
    })
  })
}

var deleteComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    comment.destroy()
    .then(() => {
      res.redirect('/comments')
    })
  })
}


module.exports = {
  index: index,
  newComment: newComment,
  createComment: createComment,
  showComment: showComment,
  editComment: editComment,
  updateComment: updateComment,
  deleteComment: deleteComment
}
