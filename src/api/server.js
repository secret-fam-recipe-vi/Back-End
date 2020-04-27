const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const registerRouter = require('../routes/register-router.js');
const loginRouter = require('../routes/login-router.js');
// @TODO: recipesRouter 

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
// @TODO: /api/recipes 

server.get("/", (req, res) => {
  res.json({ api: "up and running :)" });
});

module.exports = server;
