const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtconfig = require('../jwt-config');
const userModel = require('../models/user.model');

const { serverError } = require('../utils/handlers');

const tokenDuration = 86400; //seconds (or 24 hours)
const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../jwt-config');

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
        serverError(res);
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
          /*console.log(jwt);
          console.log(user._id);
          console.log(jwtconfig);
          console.log(jwtconfig.secret);
          const token = jwt.sign({id: user._id}, jwtconfig.secret);*/
          return res.send({user});
        }
    });
  }).catch(serverError(res));
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
        
        //success! create tokens
        const accessToken = generateAccessToken(user[0].user_id, {
          expiresIn: tokenDuration,
        });
        const refreshToken = generateRefreshToken(user[0].user_id, {
          expiresIn: tokenDuration,
        });

        refreshTokens.push(refreshToken);

        return res
        .header('access_token', accessToken) 
        .json({
          auth: true,
          msg: 'Logged in!',
          token_type: 'bearer',
          access_token: accessToken,
          expires_in: tokenDuration,
          refresh_token: refreshToken,
        })
        .send();
      })
  });
  }
  catch (error) {
    res.status(400);
    serverError(error);
  }
}

exports.token = (req, res) => {
  const refreshToken = req.body.token;

  // stop user auth validation if no token provided
  if (!refreshToken) {
    res
      .status(401)
      .json({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  // stop refresh is refresh token invalid
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({ msg: 'Invalid Refresh Token' });
  }

  const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

  if (verified) {
    const accessToken = generateToken(user[0].user_id, { expiresIn: tokenDuration });
    res
      .header('access_token', accessToken) 
      .json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: tokenDuration,
        refresh_token: refreshToken,
      });
  }
  res.status(403).json({ msg: 'Invalid Token' });
};

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
  }).catch(serverError(res));
}

exports.logout = async (req, res) => {
  const refreshToken = req.body.token;
  const tokenIndex = refreshTokens.indexOf(refreshToken);
  if (tokenIndex > -1) {
    refreshTokens.splice(tokenIndex, 1);
  }
  res.json({ msg: 'Logout successful' });
};

