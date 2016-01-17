'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

// GET shows list of all users
router.get('/', function(req, res, next) {
  res.send('lists all users');
});

// GET new takes user to create user page
router.get('/new', function(req, res, next) {
  res.render('users/create', {
    title: 'Create User'
  });
});

// POST new inserts user data into db and redirects to user profile
router.post('/new', function(req, res, next) {
  bcrypt.hash(req.body.password, 8, function(err, hash) {
    if (err) {
      next(new Error(err));
    }
    req.body.password = hash;
    knex('users')
      .insert(req.body)
      .then(function() {
        res.redirect('/');
      })
      .catch(function(err) {
        next(new Error(err));
      });
  });
});

module.exports = router;
