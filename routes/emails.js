const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const emails = require('../fixtures/users.json');
const generateId = require('../lib/generate-id');
const NotFound = require('../lib/not-found');

let upload = multer({dest: path.join(__dirname, '../uploads')});

let getEmailsRoute = (req, res) => {
  res.send(emails);
}

let getEmailRoute = (req, res) => {
  let email = emails.find(e => e.id.toString() === req.params.id)
  if (!email) { throw new NotFound(); }
  res.send(email)
}

let createEmailRoute = async (req, res) => {
  let attachements = (req.files || []).map(f => f.filename);
  let newEmail = {...req.body, id: generateId(), attachements};
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
}

let updateEmailRoute = async (req, res) => {
    let email = emails.find((e) => e.id.toString() === req.params.id);
    if (!email) { throw new NotFound(); }
    Object.assign(email, req.body);
    res.status(200);
    res.send(email);
}

let deleteEmailRoute = (req, res) => {
  let index = emails.findIndex((e) => e.id.toString() === req.params.id);
  if (!index) { throw new NotFound(); }
  emails.splice(index, 1);
  res.sendStatus(200);
}

let jsonBodyParser = bodyParser.json({limit: '100kb'});

let emailsRouter = express.Router()

emailsRouter.get('/', getEmailsRoute);
emailsRouter.get('/:id', getEmailRoute);
emailsRouter.post(
  '/',
  jsonBodyParser,
  upload.array('attachements'),
  createEmailRoute
);
emailsRouter.patch('/:id', jsonBodyParser, updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;
