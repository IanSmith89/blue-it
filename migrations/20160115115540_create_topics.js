'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(table) {
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
