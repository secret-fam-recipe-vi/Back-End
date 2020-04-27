const router = require("express").Router();

const Recipes = require("../models/recipeModel.js");


// retrieving a list of recipes.
router.get('/', (req, res) => {
    Recipes.getRecipes()
      .then(recipes => {
        res.json(recipes);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get recipes" });
      });
  });

// adding Recipes.
router.post('/', (req, res) => {
    Recipes.addRecipe(req.body)
        .then(recipe => {
            res.json(recipe)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to post new recipe. "})
        })
})

module.exports = router;