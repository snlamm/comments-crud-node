const express = require('express'),
  app = express(),
  dotEnv = require('dotenv').config(),
  path = require('path'),
  hbs = require('hbs'),
  bodyParser = require('body-parser'),
  morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const commentsRoutes = require('./routes/comments/routes.js')
const usersRoutes = require('./routes/users/routes.js')

app.use('/comments', commentsRoutes)
app.use('/users', usersRoutes)

app.listen(3000, function() {
  console.log('listening on port 3000')
})

// module.exports = app;
