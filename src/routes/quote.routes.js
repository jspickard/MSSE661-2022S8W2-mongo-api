const controllers = require('../controllers/quote.controller');
const express = require('express');

const quoteRoutes = express.Router();
/**
 * Express routes for quotes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all quotes. Evaluates to `/quotes/`.
 */
quoteRoutes.get('/', controllers.getAllquotes).post('/', controllers.createquote);

/**
 * Request for a random quote.
 */
 quoteRoutes.get('/getrandom', controllers.getrandom);

/**
 * Routes for a quote by id. Evalutes to `/quotes/:quoteId`.
 */
quoteRoutes
  .get('/:quoteId', controllers.getquote)
  .post('/:quoteId', controllers.updatequote)
  .delete('/:quoteId', controllers.deletequote);

  module.exports = quoteRoutes;
