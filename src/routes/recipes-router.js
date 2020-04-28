const router = require("express").Router();
const jwt = require('jsonwebtoken');
const Recipes = require("../models/recipeModel.js");

// GETS A LIST OF ALL OF LOGGED IN USER'S RECIPES
router.get('/', (req, res) => {
  const token = req.headers.authorization;
  if(token) {
    const { userId } = jwt.decode(token);
    Recipes.getUserRecipes(userId)
      .then(recipes => {
        if(recipes) {
          res.json(recipes)
        } else {
          res.status(401).json({ message: "User has not created any recipes." })
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: err.message });
      });
  } else {
    res.status(400).json({ message: "You must be logged in to do that." })
  }
});

// GETS SINGLE RECIPE BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.getRecipeById(id)
    .then(recipe => {
      if(recipe[0].id) {
        res.json(recipe)
      } else {
        res.status(401).json({ message: "No recipes found with that id" })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })
})

// CREATES NEW RECIPE (& ADDS RECIPE CATEGORIES IF INCLUDED)
router.post('/', (req, res) => {
    const token = req.headers.authorization;
    const { title, source, ingredients, instructions, notes, categories } = req.body;

    if (token) {
      const { userId } = jwt.decode(token);
      const newRecipe = { title, source, ingredients, instructions, notes, user_id: userId };

      Recipes.addRecipe(newRecipe)
        .then(recipe => {
          if(categories) {
            Recipes.addCategory(c, recipe[0].id)
              .then(response => {
                res.status(201).json({ message: "Recipe added successfully" })
              })
              .catch(err => {
                res.status(500).json({ errorMessage: err.message })
              })
          } else {
            res.status(201).json({ message: "Recipe added successfully" })
          }
        })
        .catch(err => {
          res.status(500).json({ errorMessage: err.message })
        })
    } else {
      res.status(400).json({ message: "You must be logged in to do that." })
    }
})

// DELETE RECIPE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Recipes.delete(id)
    .then(count => {
      if(count > 0) {
        res.json({ message: "Recipe deleted successfully" })
      } else {
        res.status(404).json({ message: "Recipe with specified id does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })
})

module.exports = router;