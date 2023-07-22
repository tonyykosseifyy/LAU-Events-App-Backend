const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');


router.get('/', eventController.getAll);
router.get('/:id', eventController.getOne);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.deleteOne);

module.exports = router;
