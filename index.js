const path = require('path');
const express = require('express');
const compress = require('compression');
const serveStatic = require('serve-static');
const logger = require('./lib/logger');
const NotFound = require('./lib/not-found');
const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

let app = express();

let notFoundHandler = (err, req, res, next) => {
  if (err instanceof NotFound) {
    res.sendStatus(404);
    next();
  } else {
    next(err);
  }
}

app.use(logger);
app.use(compress(/*{threshold: 0}*/));

app.use(serveStatic(path.join(__dirname, './public')));

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.use(notFoundHandler);

app.listen('3000');
