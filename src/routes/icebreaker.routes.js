const controllers = require('../controllers/icebreaker.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const icebreakerRoutes = express.Router();
/**
 * Express routes for icebreakers.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all icebreakers. Evaluates to `/icebreakers/`.
 */
icebreakerRoutes.get('/', controllers.getAllicebreakers).post('/', canAccess, controllers.createicebreaker);

/**
 * Request for a random icebreaker.
 */
 icebreakerRoutes.get('/getrandom', controllers.getrandom);

/**
 * Routes for a icebreaker by id. Evalutes to `/icebreakers/:icebreakerId`.
 */
icebreakerRoutes
  .get('/:icebreakerId', controllers.geticebreaker)
  .post('/:icebreakerId', canAccess, controllers.updateicebreaker)
  .delete('/:icebreakerId', canAccess, controllers.deleteicebreaker);

  module.exports = icebreakerRoutes;
