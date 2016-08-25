const escaper = require('validator/lib/escape');
const toInt = require('validator/lib/toInt');
const db = require('../../models');
const Comment = db.comment;
const User = db.user;
const Promise = require('bluebird');

const findAllComments = function () {
  return Comment.findAll({
    attributes: ['id', 'content', 'createdAt'],
    order: ['createdAt'],
    include: [{
      model: User,
      attributes: ['id', 'name']
    }]
  });
};

const getAllComments = function () {
  return findAllComments()
    .then(function (comments) {
      if (!comments) {
        throw {code: 404, message: `Can't find any comments`};
      }
      return comments;
    });
};

var newComment = (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name']
  }).then((users) => {
    res.render('comments/new', {users: users})
  })
}

const getUserById = function (userId) {
  return User.findById(userId);
};

const requiredCommentFieldsExist = function (content, userId) {
  if (!content || !userId) {
    throw {code: 400, message:`Can't find user by id ${userId}`};
  }
};

const createComment = function (load) {
  const content = load.content;
  const userId = load.userId;

  return Promise.resolve(requiredCommentFieldsExist(content, userId))
    .then(function () {
      return getUserById(userId);
    })
    .then(function (user) {
      if (!user) {
        throw {code: 404, message:`Can't find user by id ${userId}`};
      }

      return user;
    })
    .then(function () {
      return Comment.create({
        content: content,
        userId: userId
      });
    })
    .then((comment) => {
      return comment;
    });
};


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
  // index: index,
  getAllComments,
  newComment: newComment,
  createComment,
  showComment: showComment,
  editComment: editComment,
  updateComment: updateComment,
  deleteComment: deleteComment
}
