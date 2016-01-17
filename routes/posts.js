'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET homepage shows all posts
router.get('/', function(req, res, next) {
  knex('posts')
    .then(function(posts) {
      // res.json(posts);\
      res.render('index', {
        title: 'Blue-It',
        data: posts
      });
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

// GET create new post page
router.get('/new', function(req, res, next) {
  res.render('posts/create', {
    title: 'Create new Post'
  });
});

// POST adds post to database
router.post('/new', function(req, res, next) {
  req.body.rating = 0;
  req.body.topic_id = Number(req.body.topic_id);
  knex('posts')
    .insert(req.body)
    .then(function() {
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
      res.render('index', {
        title: topic[0].name,
        data: topic
      });
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

module.exports = router;
