'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function isLoggedIn(req) {
  if (req.session && req.session.user) {
    return true;
  } else {
    return false;
  }
}

// GET homepage shows all posts
router.get('/', function(req, res, next) {
  knex('posts')
    .then(function(posts) {
      if (isLoggedIn(req)) {
        res.render('index', {
          title: 'Blue-It',
          data: posts,
          isLoggedIn: true,
          username: req.session.user.username
        });
      } else {
        res.render('index', {
          title: 'Blue-It',
          data: posts
        });
      }
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

// GET create new post page
router.get('/new', function(req, res, next) {
  if (isLoggedIn(req)) {
    res.render('posts/create', {
      title: 'Create new Post',
      isLoggedIn: true,
      username: req.session.user.username
    });
  } else {
    res.redirect('/auth/login');
  }
});

// POST adds post to database
router.post('/new', function(req, res, next) {
  req.body.rating = 0;
  req.body.topic_id = Number(req.body.topic_id);
  knex('posts')
    .insert(req.body)
    .then(function(post) {
      res.redirect('/');
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

// GET posts by topic
router.get('/:id', function(req, res, next) {
  knex('posts')
    .innerJoin('topics', 'posts.topic_id', 'topics.id')
    .select('topics.name', 'posts.title', 'posts.body', 'posts.rating')
    .where({
      topic_id: req.params.id
    })
    .then(function(topic) {
      if (isLoggedIn(req)) {
        res.render('index', {
          title: topic[0].name,
          data: topic,
          isLoggedIn: true,
          username: req.session.user.username
        });
      } else {
        res.render('index', {
          title: topic[0].name,
          data: topic,
          isLoggedIn: false
        });
      }
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

module.exports = router;
