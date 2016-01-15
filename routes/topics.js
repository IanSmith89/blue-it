'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET all topics
router.get('/', function(req, res, next) {
  knex('topics')
    .then(function(topics) {
      res.json(topics);
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

// GET all posts by topic
router.get('/:id', function(req, res, next) {
  knex('topics')
    .select()
    .where({
      id: req.params.id
    })
    .then(function(topics) {
      res.json(topics);
    })
    .catch(function(err) {
      next(new Error(err));
    });
});

module.exports = router;
