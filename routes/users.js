'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

function isLoggedIn(req) {
  if (req.session && req.session.user) {
    return true;
  } else {
    return false;
  }
}

// GET shows list of all users
router.get('/', function(req, res, next) {
  res.send('lists all users');
});

// GET new takes user to create user page
router.get('/new', function(req, res, next) {
  if (isLoggedIn(req)) {
    res.render('users/create', {
      title: 'Create User',
      isLoggedIn: true,
      username: req.session.user.username
    });
  } else {
    res.render('users/create', {
      title: 'Create User'
    });
  }
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
      .returning('*')
      .then(function(user) {
        req.session.user = {
          id: user[0].id,
          username: user[0].username
        };
        res.redirect('/');
      })
      .catch(function(err) {
        next(new Error(err));
      });
  });
});

module.exports = router;
