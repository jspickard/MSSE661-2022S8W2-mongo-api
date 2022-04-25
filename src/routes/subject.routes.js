const controllers = require('../controllers/subject.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware');

const subjectRoutes = express.Router();
/**
 * Express routes for subjects.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all subjects. Evaluates to `/subjects/`.
 */
subjectRoutes.get('/', controllers.getAllsubjects).post('/', canAccess, controllers.createsubject);

/**
 * Request for a random subject.
 */
 subjectRoutes.get('/getrandom', controllers.getrandom);

/**
 * Routes for a subject by id. Evalutes to `/subjects/:subjectId`.
 */
subjectRoutes
  .get('/:subjectId', controllers.getsubject)
  .post('/:subjectId', canAccess, controllers.updatesubject)
  .delete('/:subjectId', canAccess, controllers.deletesubject);

  module.exports = subjectRoutes;
