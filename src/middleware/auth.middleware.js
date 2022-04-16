//checks for invalid access and sends responds
const { jwtconfig, verifyToken } = require('../jwt-config');

module.exports = (req, res, next) => {
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];
  console.log(authHeader);

  if (!authHeader) {
    // stop user auth validation
    res
      .status(401)
      .json({ auth: false, msg: 'Access Denied. No token provided.' });
  }//doesn't catch users that aren't logged in

  try {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {throw 'err';}
    // verify the token is correct
    const user = verifyToken(accessToken, jwtconfig.access, req, res);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid Token' });
  }
};