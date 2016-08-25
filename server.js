/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "hbs|dotEnv" }]*/

const express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');

const commentsRoutes = require('./routes/comments/routes.js');
const usersRoutes = require('./routes/users/routes.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);

app.listen(3000, function () {
  console.log('listening on port 3000');
});

// module.exports = app;
