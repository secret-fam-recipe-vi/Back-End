
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          id: 1,
          user_id: 5,
          title: "Scrambled Eggs",
          source: "Mom",
          ingredients: "2 eggs",
          instructions: "Scramble eggs in the pan",
        },
        {
          id: 2,
          user_id: 5,
          title: "PB&J",
          ingredients: "2 slices of bread \n 1tsp jam \n 1tbsp peanut butter",
          instructions: "1. Spread jam and peanut butter onto bread \n 2. Smush bread togther",
          notes: "Whole wheat bread is tastiest! Strawberry jam highly recommended."
        }
      ]);
    });
};
