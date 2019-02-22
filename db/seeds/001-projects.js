
exports.seed = function(knex, Promise) {
  return knex('projects')
    .truncate()
    .then(function() {
      return knex('projects').insert([
        { name: 'project1', description: 'something awesome' },
        { name: 'project2', description: 'something awesome' },
        { name: 'project3', description: 'something awesome' },
      ]);
    });
};
