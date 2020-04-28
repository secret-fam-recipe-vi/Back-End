
exports.up = function(knex) {
  return knex.schema
    //RECIPES 
    .createTable('recipes', tbl => {
        //id, primary key
        tbl.increments();
        //user_id, foreign key 
        tbl.integer('user_id')
            // .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        //title, string, required
        tbl.string('title')
            .notNullable();
        //source, string, optional
        tbl.string('source');
        //ingredients, text, required
        tbl.text('ingredients')
            .notNullable();
        //instructions, text, required
        tbl.text('instructions')
            .notNullable();
        //notes, text, optional
        tbl.text('notes');
    })
    //CATEGORIES
    .createTable('categories', tbl => {
        //id, primary key
        tbl.increments();
        //name, string, required, unique
        tbl.string('name')
            .notNullable()
            .unique();
    })
    //RECIPE_CATEGORIES
    .createTable('recipe_categories', tbl => {
        //id, primary key
        tbl.increments();
        //category_id, foreign key
        tbl.integer('category_id')
            // .unsigned()
            .notNullable()
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
        //recipe_id, foreign key
        tbl.integer('recipe_id')
            // .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipe_categories')
    .dropTableIfExists('categories')
    .dropTableIfExists('recipes')
};
