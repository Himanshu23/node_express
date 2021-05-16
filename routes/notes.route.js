const express = require('express');

const router = express.Router();
const notesController = require('../controller/notes.controller');
const middleware = require('../middleware/auth');

router.post('/', middleware.authenticate, notesController.add);
router.put('/', middleware.authenticate, notesController.update);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get('/', middleware.authenticate, notesController.getAll);
router.delete('/:notesId', middleware.authenticate, notesController.remove);

module.exports = router;
