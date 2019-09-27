const express = require('express');
const users = require('../fixtures/users.json');

let getUsersRoute = (req, res) => {
  res.send(users);
}

let getUserRoute = (req, res) => {
  let user = users.find(u => u.id.toString() === req.params.id)
  res.send(user)
}

let usersRouter = express.Router()

usersRouter.get('/', getUsersRoute);
usersRouter.get('/:id', getUserRoute);

module.exports = usersRouter;
