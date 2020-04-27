const db = require('../data/dbConfig.js');

// this file contains functions on how we interact with recipes table.

module.exports = {
    getRecipes,
    addRecipe,
    add, 
    findBy,
    findById
}

function getRecipes() {
    return db("recipes")
    // @TODO: need to filter by user_id so not all recipes are revealed
    // .where(user_id == "user_id")
}

function addRecipe(recipe) {
    return db('recipes')
        .insert(recipe, 'id')
        .then(([id]) => getRecipes())
}

function findBy(filter) {
    return db("recipes").where(filter);
  }
  
  async function add(recipe) {
    const [id] = await db("recipes").insert(recipe, "id");
    return findById(id);
  }
  
  function findById(id) {
    return db("recipes").where({ id }).first();
  }

  // @TODO: Add function for deleting recipe

