var express = require('express');
var router = express.Router();
var path = require('path')

router.get('/', (req, res, next) => {
  res.render('comments/index')
})

router.post('/comments', (req, res, next) => {
  let comment = req.body
  console.log(req.body)
})

// the below is an equivalent way to render index.hbs
// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname + '/../../views/index.html'))
// })

module.exports = router
