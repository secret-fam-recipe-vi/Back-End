const db = require('../data/dbConfig');

module.exports = {
    findUserRecipes,
    findRecipeCategories
}

/*
get user's recipes in mysql: 

SELECT r.*
, GROUP_CONCAT(c.name, ', ') as categories
FROM Recipes r 
JOIN recipe_categories rc ON rc.recipe_id = r.id
INNER JOIN categories c ON c.id = rc.category_id
WHERE r.user_id = 2
GROUP BY r.id
*/
//group concat doenst exist in knex...researching best way to handle this

function findUserRecipes(userId) {
    return db.select('*')
        .from('recipes as r')
        .where('r.user_id', userId)
}

function findRecipeCategories(recipeId) {
    return db.select('c.*')
        .from('categories as c')
        .join('recipe_categories as rc', 'rc.category_id', 'c.id')
        .where('rc.recipe_id', recipeId)
}


//GET user's recipes
// -----> https://familyrecipes.com/api/users/22/recipes
//router.get('/:id/recipes', (req, res) => {

// })
