const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteOne);


module.exports = router;
