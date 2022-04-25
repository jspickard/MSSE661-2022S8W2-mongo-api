const controllers = require('../controllers/phrase.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const phraseRoutes = express.Router();
/**
 * Express routes for phrases.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all phrases. Evaluates to `/phrases/`.
 */
phraseRoutes.get('/', canAccess, controllers.getAllphrases).post('/', canAccess, controllers.createphrase);

/**
 * Request for a random phrase.
 */
 phraseRoutes.get('/getrandom', canAccess, controllers.getrandom);

/**
 * Routes for a phrase by id. Evalutes to `/phrases/:phraseId`.
 */
phraseRoutes
  .get('/:phraseId', canAccess, controllers.getphrase)
  .post('/:phraseId', canAccess, controllers.updatephrase)
  .delete('/:phraseId', canAccess, controllers.deletephrase);

  module.exports = phraseRoutes;
