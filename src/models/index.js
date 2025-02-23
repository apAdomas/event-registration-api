'use strict';

/**
 * @fileoverview Loads all Sequelize models dynamically and sets up their associations.
 */

const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const db = {};
const basename = path.basename(__filename);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;