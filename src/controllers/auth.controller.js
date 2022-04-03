const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtconfig = require('../jwt-config');
const userModel = require('../models/user.model');

exports.registerUser = function(req, res) {
  const passwordHash = bcrypt.hashSync(req.body.password);
 
  userModel.find({username: req.body.username}, function(err, result) { //, password: passwordHash, email: req.body.email
    console.log(result.length)
    if (err || (result.length > 0)) {
      //stop registration
      console.log(err);
      res
        .status(500)
        .send({msg: 'Could not register user. Try again later.'});
        return
    }

    const newuser = new userModel({username: req.body.username, email: req.body.email, password: passwordHash});
    
    newuser.save(function(err, user) {
      if (err) {
        res.status(500);
        res.send({msg: 'Could not find user.'});
      }

      console.log(user);
      res.send(user);
    });
  });
};

exports.login = function(req, res) {
  //check user exists
  userModel.find({username: req.body.username}, function(err, user) {
    if (err || (user.length === 0)) {
      res.status(500);
      res.send({msg: 'Could not find user.'});
      return
    }

    console.log(user);
    
    //validate entered password from database of saved encrypted passwords
    bcrypt
      .compare(req.body.password, user[0].password)
      .then(function(validPass) {
        if (!validPass) {
          res.status(400).send({msg: 'Invalid password!'});
        }
        //success! create token
        const token = jwt.sign({id: user[0]._id}, jwtconfig.secret);
        res
          .header('auth-token', token)
          .send({auth: true, msg: 'Logged in!'});
      })
      .catch(console.log);
  });
}

exports.updateUser = function(req, res) {
  //check user exists
  userModel.find({username: req.body.username}, function(err, user) {
    if (err || (result.length > 0)) {
      res.status(500);
      res.send({msg: 'Could not find user.'});
      return
    }

    console.log(user);

    const passwordHash = bcrypt.hashSync(req.body.password);

    //perform update
    userModel.findOneAndUpdate({username: req.body.username, email: req.body.email, password: passwordHash},
      req.body,
      { new: true },
      function(err, data) {
        if (err) {
          consoler.log(err);
          res.status(500).send({msg: 'Could not update user'});
        }
        res.json({msg: 'Updated successfully!'});
      }
    );
  });
}

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

