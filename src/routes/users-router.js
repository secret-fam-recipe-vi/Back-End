const router = require("express").Router();

const Users = require("../models/usersModel.js");

router.get("/", (req, res) => {
  console.log("token", req.decodedToken);

  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
