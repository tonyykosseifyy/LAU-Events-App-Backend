const express = require('express');
const router = express.Router();
const clubEventController = require('../controllers/clubEventController.js');


router.get('/', clubEventController.getAll);
router.get('/:id', clubEventController.getOne);
router.post('/', clubEventController.create);
router.put('/:id', clubEventController.update);
router.delete('/:id', clubEventController.deleteOne);

module.exports = router;
