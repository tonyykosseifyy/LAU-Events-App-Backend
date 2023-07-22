const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController.js');


router.get('/', clubController.getAll);
router.get('/:id', clubController.getOne);
router.post('/', clubController.create);
router.put('/:id', clubController.update);
router.delete('/:id', clubController.deleteOne);

module.exports = router;
