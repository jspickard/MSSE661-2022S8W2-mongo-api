const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtconfig = require('../jwt-config');
const userModel = require('../models/user.model');

exports.getMe = function(req, res) {
  const token = req.headers['auth-token'];

  if (!token) {
    //stop user auth
    res.status(401).send({auth: false, msg: 'No token provided.'});
  }

  jwt.verify(token, jwtconfig.secret, function(err,decoded) {
    if (err) {
      res
        .status(500)
        .send({auth: false, message: 'Failed to auth token'});
    }

    //check user exists
    userModel.find({_id: decoded.id}, function(err, user) {
      if (err) {
        res.status(500);
      }
      if (!user) {
        res.send({msg: 'Could not find user.'});
      }
      user[0].password = "(hidden)";
      res.status(200).send(user);
    })
  })
}