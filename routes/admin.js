const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');


router.get('/', adminController.getAll);
router.get('/:id', adminController.getOne);
router.post('/', adminController.create);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.deleteOne);

module.exports = router;
