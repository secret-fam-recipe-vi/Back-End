const router = require("express").Router();

const Recipes = require("../models/recipeModel.js");

router.get("/", (req, res) => {
  console.log("token", req.decodedToken);

  Recipes.get()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => res.send(err));
});

module.exports = router;