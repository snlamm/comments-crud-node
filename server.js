const express = require('express')
const app = express()
var dotEnv = require('dotenv').config();
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const commentsRoutes = require('./routes/comments/routes.js')
app.use('/', commentsRoutes)

app.listen(3000, function() {
  console.log('listening on port 3000')
})

// module.exports = app;
