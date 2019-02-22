
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        { description: 'something awesome', notes: 'action1', projectID: 1 },
        { description: 'something awesome', notes: 'action2', projectID: 2 },
        { description: 'something awesome', notes: 'action3', projectID: 3 },
      ]);
    });
};
