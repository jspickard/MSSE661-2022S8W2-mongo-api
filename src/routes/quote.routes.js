const controllers = require('../controllers/quote.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const quoteRoutes = express.Router();
/**
 * Express routes for quotes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all quotes. Evaluates to `/quotes/`.
 */
quoteRoutes.get('/', canAccess, controllers.getAllquotes).post('/', canAccess, controllers.createquote);

/**
 * Request for a random quote.
 */
 quoteRoutes.get('/getrandom', canAccess, controllers.getrandom);

/**
 * Routes for a quote by id. Evalutes to `/quotes/:quoteId`.
 */
quoteRoutes
  .get('/:quoteId', canAccess, controllers.getquote)
  .post('/:quoteId', canAccess, controllers.updatequote)
  .delete('/:quoteId', canAccess, controllers.deletequote);

  module.exports = quoteRoutes;
