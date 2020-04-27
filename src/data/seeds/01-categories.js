
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Breakfast'},
        {id: 2, name: 'Lunch'},
        {id: 3, name: 'Dinner'},
        {id: 4, name: 'Vegetarian'},
        {id: 5, name: 'Vegan'},
        {id: 6, name: 'Gluten-Free'},
      ]);
    });
};
