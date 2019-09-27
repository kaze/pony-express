const express = require('express');
const emails = require('../fixtures/users.json');
const readBody = require('../lib/read-body');
const generateId = require('../lib/generate-id');

let getEmailsRoute = (req, res) => {
  res.send(emails);
}

let getEmailRoute = (req, res) => {
  let email = emails.find(e => e.id.toString() === req.params.id)
  res.send(email)
}

let createEmailRoute = async (req, res) => {
  try {
    readBody(req).then((body) => {
      let newEmail = {...JSON.parse(body), id: generateId()};
      emails.push(newEmail);
      res.status(201);
      res.send(newEmail);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({message: e.message});
  }
}

let updateEmailRoute = async (req, res) => {
  try {
    readBody(req).then((body) => {
      let email = emails.find((e) => e.id.toString() === req.params.id);
      Object.assign(email, JSON.parse(body));
      res.status(200);
      res.send(email);
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({message: e.message});
  }
}

let deleteEmailRoute = (req, res) => {
  let index = emails.findIndex((e) => e.id.toString() === req.params.id);
  emails.splice(index, 1);
  res.sendStatus(200);
}

let emailsRouter = express.Router()

emailsRouter.get('/', getEmailsRoute);
emailsRouter.get('/:id', getEmailRoute);
emailsRouter.post('/', createEmailRoute);
emailsRouter.patch('/:id', updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;
