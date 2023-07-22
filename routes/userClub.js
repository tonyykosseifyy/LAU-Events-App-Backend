const express = require('express');
const router = express.Router();
const userClubController = require('../controllers/userClubController.js');


router.get('/', userClubController.getAll);
router.get('/:id', userClubController.getOne);
router.post('/', userClubController.create);
router.put('/:id', userClubController.update);
router.delete('/:id', userClubController.deleteOne);

module.exports = router;
