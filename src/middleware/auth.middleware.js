const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

module.exports = function(req, res, next) {
  const token = req.headers['auth-token'];

  if (!token) {
    //stop user auth
    res.status(401).send({auth:false, msg: 'Access Denied'});
  }

  try {
    //return user id when creating token
    const verified = jwt.verify(token, jwtconfig.secret);

    req.user = verified;
    next();
  }
  catch (err) {
    res.status(400).send({msg: 'Invalid token'});
  }
}