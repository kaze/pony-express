// Usage:
//      ...
//      [err, user] = await to(UserModel.findById(1));
//      if (err) console.error('Just log the error and continue flow');
//      if(!user) throw new CustomerError('No user found');
//      ...

to = (promise) => {
  try {
    promise
      .then(data => [null, data]);
      .catch(err => [err]);
  } catch (e) { return [e]}
}

module.exports = to;
