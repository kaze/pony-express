const users = require('../fixtures/users');

let findUserByCredentials = ({username, password}) => {
  return users.find(u => u.username === username && u.password === password)
}

exports.byCredentials = findUserByCredentials;
