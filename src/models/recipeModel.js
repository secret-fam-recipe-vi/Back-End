const db = require('../data/dbConfig.js');

// this file contains functions on how we interact with recipes table.

module.exports = {
    getUserRecipes,
    getRecipeById,
    addRecipe,
    addCategory,
    findBy,
    update,
    remove
}

function getUserRecipes(userId) {
    return db.select('r.*'
      , db.raw("GROUP_CONCAT(c.name, ', ') as categories")
      )
      .from('recipes as r')
      .join('recipe_categories as rc', 'rc.recipe_id', 'r.id')
      .join('categories as c', 'rc.category_id', 'c.id')
      .where('r.user_id', userId)
      .groupBy('r.id')
}

function getRecipeById(recipeId) {
  return db.select('r.*'
    , db.raw("GROUP_CONCAT(c.name, ', ') as categories")
    )
    .from('recipes as r')
    .join('recipe_categories as rc', 'rc.recipe_id', 'r.id')
    .join('categories as c', 'rc.category_id', 'c.id')
    .where('r.id', recipeId)
}

function addRecipe(recipe) {
    return db('recipes')
        .insert(recipe, 'id')
}

function addCategory(catId, recipeId) {
  return db('recipe_categories as rc')
    .insert({category_id: catId, recipe_id: recipeId}, 'id')
}

function findBy(filter) {
    return db("recipes").where(filter);
}

function update() {
//update recipe helper function
}

function remove(recipeId) {
  return db("recipes")
    .where('id', recipeId)
    .del()
}
