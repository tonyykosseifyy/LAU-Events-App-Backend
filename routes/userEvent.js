const express = require('express');
const router = express.Router();
const userEventController = require('../controllers/userEventController.js');


router.get('/', userEventController.getAll);
router.get('/:id', userEventController.getOne);
router.post('/', userEventController.create);
router.put('/:id', userEventController.update);
router.delete('/:id', userEventController.deleteOne);

module.exports = router;
