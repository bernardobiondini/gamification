const config = require('../knexfile');
const knex = require('knex');

const database = knex(config);

module.exports = database;