const escaper = require('validator/lib/escape')
const toInt = require('validator/lib/toInt')
const db = require('../../models')
const Comment = db.comment
const User = db.user


var index = (req, res, next) => {
  Comment.findAll({
    attributes: ['id', 'content', 'createdAt'],
    order: ['createdAt'],
    include: [{
      model: User,
      attributes: ['id', 'name']
    }]
  })
  .then((comments) => {
    res.render('comments/index', {comments: comments})
  })
}

var newComment = (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name']
  }).then((users) => {
    res.render('comments/new', {users: users})
  })
}

var createComment = (req, res, next) => {
  let comment = req.body
  let userId = toInt(comment["user"])
  let content = escaper(comment["content"])
  Comment.create({
    content: content,
    userId: userId
  })
  .then(() => {
    res.redirect('/comments')
  })
}

var showComment = (req, res, next) => {
  Comment.findById(req.params.id, {
    include: [{model: User}]
  }).then((comment) => {
    res.render('comments/show', {comment: comment})
  })
}

var editComment = (req, res, next) => {
  db.sequelize.Promise.all([
    Comment.findById(req.params.id, {
      include: [{model: User}]
    }),
    User.findAll({
      attributes: ['id', 'name']
    })
  ])
  .spread((comment, users) => {
    res.render('comments/edit', {comment: comment, users: users})
  })
}

var updateComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    let commentUpdate = req.body
    let userId = toInt(commentUpdate["user"])
    let content = escaper(commentUpdate['content'])
    comment.update({
      userId: userId,
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
