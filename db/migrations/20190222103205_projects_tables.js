
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('project', project => {
            project.increments();
            project.string('name', 100).notNullable();
            project.string('description', 255).notNullable();
            project.boolean('completed').defaultTo(false);
        })
        .createTable('actions', action => {
            action.increments();
            action.string('description', 300).notNullable();
            action.string('notes', 300).notNullable();
            action.boolean('completed').defaultTo(false);
            action 
                .integer('projectID')
                .unsigned()
                .references('id')
                .inTable('project')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
};

exports.down = function(knex, Promise) {
  
};
