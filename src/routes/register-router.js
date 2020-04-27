const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../models/usersModel.js');

router.post('/', (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    })

});

  module.exports = router;