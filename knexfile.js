'use strict';

require('dotenv').load();
var pg = require('pg');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    }
  },

  production: {
    client: 'pg',
    connection: {
      connection: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
