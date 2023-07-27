const express = require('express');
const router = express.Router();
const userEventsController = require('../controllers/userEventsController.js');


router.get('/', userEventsController.getAll);
router.get('/:id', userEventsController.getOne);
router.post('/', userEventsController.create);
router.put('/:id', userEventsController.update);
router.delete('/:id', userEventsController.deleteOne);

module.exports = router;
