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

// GET signin takes user to signin page
router.get('/login', function(req, res, next) {
  if (isLoggedIn(req)) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'User Login'
    });
  }
});

// POST login checks authenticates user, adds session cookie if user, else redirects
router.post('/login', function(req, res, next) {
  knex('users')
    .first()
    .where({
      username: req.body.username
    })
    .then(function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, same) {
          if (same) {
            req.session.user = {
              id: user.id,
              username: user.username
            };
            res.redirect('/');
          } else {
            next(new Error('Username or password incorrect'));
          }
        });
      } else {
        next(new Error('Username or password incorrect'));
      }
    })
    .catch(function(err) {
      next(new Error('Username or password incorrect'));
    });
});

// GET logout logs out user
router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
