var fs        = require('fs');
var path      = require('path');
// module.filename returns the absolute path to the file from which it was called. path.basename returns the last part of that path, in this case index.js
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../database/config.js')[env];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
// get all file names in this directory
  .readdirSync(__dirname)
  // filter out this file and any files that start with '.'
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  // if the file is a .js file, then use sequalize import to require it
  .forEach((file) => {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

// if there is the string 'associate' in the model, then create the specificed association
  Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
