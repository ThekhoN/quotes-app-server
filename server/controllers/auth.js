const User = require('../models/user');
// const jwt = require('jwt-simple');

const auth = {
  signup: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(422).send({error: 'email and password are required!'});
    }
    User.findOne({email}, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(422).send({error: 'email already in use'});
      }
      const user = new User({
        email,
        password
      });
      user.save(err => {
        if (err) {
          return next(err);
        } else {
          res.send({message: 'Thank you for signing up :)'});
        }
      });
    });
  },
  signin: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(422).send({error: 'email and password are required!'});
    }
    User.find({email, password}, (err, user) => {
      if (err) {
        return next(err);
      } else {
        return res.send({message: 'Welcome :)'});
      }
    });
  }
};

module.exports = auth;
