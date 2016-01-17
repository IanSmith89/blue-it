'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg');
var bcrypt = require('bcrypt');

// GET signin takes user to signin page
router.get('/signin', function(req, res, next) {
  res.send('takes user to signin page');
});

// POST signin checks authenticates user, adds session cookie if user, else redirects

module.exports = router;
