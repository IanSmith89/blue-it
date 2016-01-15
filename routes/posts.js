'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET homepage shows all posts
router.get('/', function(req, res, next) {
  knex('posts')
    .then(function(posts) {
      res.json(posts);
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

// GET posts by topic
router.get('/:id', function(req, res, next) {
  knex('posts')
    .select('posts.title', 'posts.body', 'posts.rating')
    .where({
      topic_id: req.params.id
    })
    .then(function(posts) {
      res.json(posts);
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

module.exports = router;
