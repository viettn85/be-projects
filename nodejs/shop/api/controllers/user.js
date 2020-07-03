const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((users) => {
      if (users.length > 0) {
        return res.status(409).json({
          message: 'Email is existed',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: 'User created',
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err.message,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.signin = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((users) => {
      if (users.length === 0) {
        return res.status(401).json({
          message: 'Auth Failed',
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed',
          });
        }
        console.log(result);
        if (result) {
          const token = jwt.sign(
            {
              email: users[0].email,
              _id: users[0]._id,
            },
            process.env.KEY,
            {
              expiresIn: '1h',
            }
          );
          return res.status(200).json({
            message: 'Auth Successful',
            token: token,
          });
        }
        return res.status(401).json({
          message: 'Auth Failed',
        });
      });
    })
    .catch((err) => {
      console.log('Error to delete an user');
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.delete_user = (req, res, next) => {
  User.deleteOne({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: 'User not existed',
        });
      }
      res.status(200).json({
        message: 'User deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:5000/users/signup',
          body: { email: 'String', password: 'Number' },
        },
      });
    })
    .catch((err) => {
      console.log('Error to delete an user');
      res.status(500).json({
        error: err.message,
      });
    });
};
