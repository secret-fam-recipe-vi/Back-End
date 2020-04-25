
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username').unique().notNullable().index();
        tbl.string('password').unique().notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  