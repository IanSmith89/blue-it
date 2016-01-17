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

module.exports = router;
