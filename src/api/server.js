const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const registerRouter = require('../routes/register-router.js');
const loginRouter = require('../routes/login-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
// server.use('/api/users', authenticator, usersRouter)

server.get("/", (req, res) => {
  res.json({ api: "up and running :)" });
});

module.exports = server;
