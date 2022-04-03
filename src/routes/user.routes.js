const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware')
const express = require('express');

const userRoutes = express.Router();

/**
 * Express routes for user.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

 userRoutes.get('/me', verifyToken, userController.getMe);

 userRoutes.post('/me/update', verifyToken, authController.updateUser);

module.exports = userRoutes;
