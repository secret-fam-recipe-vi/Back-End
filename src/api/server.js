const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authenticator = require('./authenticator.js');

const registerRouter = require('../routes/register-router.js');
const loginRouter = require('../routes/login-router.js');
const recipesRouter = require('../routes/recipes-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/recipes', authenticator, recipesRouter);

server.get("/", (req, res) => {
  res.json({ api: "up and running :)" });
});

module.exports = server;
