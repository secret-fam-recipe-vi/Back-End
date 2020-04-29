const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/usersModel.js');
const secrets = require('../api/secrets.js');

router.post("/", (req, res) => {
    let { username, password } = req.body;
  
    // search for the user using the username:
    Users.findBy({ username })
        // getting user from database:
      .then(([user]) => {
        // if we find the user, then also check that passwords match... compareSync decrypts then compares:
        if (user && bcrypt.compareSync(password, user.password)) {
          // produce a token:
          const token = generateToken(user);
          // send the token to the client:
          res.status(200).json({ message: "Welcome!", token });
        } else {
          res.status(401).json({ message: "You cannot pass!" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });

  function generateToken(user) {
    // the data:
    const payload = {
      userId: user.id,
      username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: "5d",
    };
    // creating the token:
    return jwt.sign(payload, secret, options);
  }
});
  
  module.exports = router;