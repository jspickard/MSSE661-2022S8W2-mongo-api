const controller = require('../controllers/auth.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const authRoutes = express.Router();
/**
 * Express routes for auth.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

authRoutes.post('/register', controller.registerUser);

authRoutes.post('/login', controller.login);

authRoutes.post('/logout', controller.logout);

authRoutes.get('/:username', controller.userinfo);

authRoutes.post('/updateuser', canAccess, controller.updateuser);

authRoutes.post('/updatepassword', canAccess, controller.updatepassword);

module.exports = authRoutes;
