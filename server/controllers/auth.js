const User = require('../models/user');
const jwt = require('jwt-simple');

const auth = {
  signin: (req, res, next) => {
    res.send({message: 'testing user auth signin'});
  },
  signup: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(422).send({error: 'email and password are required!'});
    }
    const newUser = new User({
      email,
      password
    });
    newUser.save(err => {
      if (err) {
        return next(err);
      }
      return res.send(newUser);
    });
  }
};

module.exports = auth;
