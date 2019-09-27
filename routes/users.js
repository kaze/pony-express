const express = require('express');
const users = require('../fixtures/users.json');
const requireAuth = require('../lib/require-auth');

let getUsersRoute = (req, res) => {
  res.send(users);
}

let getUserRoute = (req, res) => {
  let user = users.find(u => u.id.toString() === req.params.id);
  res.send(user);
}

let usersRouter = express.Router();

usersRouter.use(requireAuth);

usersRouter.get('/', getUsersRoute);
usersRouter.get('/:id', getUserRoute);

module.exports = usersRouter;
