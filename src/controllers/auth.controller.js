const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtconfig = require('../jwt-config');
const userModel = require('../models/user.model');

exports.registerUser = async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password);
 
  userModel.find({username: req.body.username}, function(err, result) { //, password: passwordHash, email: req.body.email
    console.log(result.length)
    if (err || (result.length > 0)) {
      //stop registration
      console.log(err);
      return res
        .status(500)
        .send({msg: 'Could not register user. Try again later.'});
    }

    const newuser = new userModel({username: req.body.username, email: req.body.email, password: passwordHash});

    newuser.save(function(err, user) {
      console.log(user);
      if (err) {
        res.status(500);
        res.send({msg: 'Could not find user.'});
      }

        if (!!user) {
          //success! create token
          const token = jwt.sign({id: user._id}, jwtconfig.secret);
          return res.send({user, token});
        }
    });
  });
};

exports.login = async (req, res) => {
  try {
      //check user exists
  userModel.find({username: req.body.username}, function(err, user) {
    if (err || (user.length === 0)) {
      return res.status(401).send({msg: 'Could not find user.'});
    }

    console.log('user: ' + user);
    
    //validate entered password from database of saved encrypted passwords
    bcrypt
      .compare(req.body.password, user[0].password)
      .then(function(validPass) {
        if (!validPass) {
          return res.status(402).send({msg: 'Invalid password!'});
        }
        //success! create token
        const token = jwt.sign({id: user[0]._id}, jwtconfig.secret);
        return res.send({user, token});
      })
  });
  }
  catch (error) {
    res.status(400).send(error);
  }
}

exports.updateUser = async (req, res) => {
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
          console.log(err);
          res.status(500).send({msg: 'Could not update user'});
        }
        res.json({msg: 'Updated successfully!'});
      }
    );
  });
}

exports.logout = async (req, res) => {
  try {
    console.log("req: " + req);
    console.log("res: " + res);
    console.log("req.user: " + req.user); //undefined
    console.log("req.token: " + req.token); //undefined
    console.log("req.user.tokens: " + req.user.tokens); //fails here
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log("token: " + token);
      console.log("token.token: " + token.token);
      return token.token != req.token;
    });
    await req.user.save();
    console.log("res: " + res);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

