
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('topics').del(),

    // Inserts seed entries
    knex('topics').insert({name: 'Programming'}),
    knex('topics').insert({name: 'Art'}),
    knex('topics').insert({name: 'Music'}),
    knex('topics').insert({name: 'Hockey'})
  );
};
