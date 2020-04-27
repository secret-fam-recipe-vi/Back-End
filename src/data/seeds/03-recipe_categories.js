
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_categories').insert([
        {id: 1, recipe_id: 1, category_id: 1},
        {id: 2, recipe_id: 1, category_id: 4},
        {id: 3, recipe_id: 1, category_id: 6},
        {id: 4, recipe_id: 2, category_id: 2},
        {id: 5, recipe_id: 2, category_id: 4},
        {id: 6, recipe_id: 2, category_id: 5},
      ]);
    });
};
