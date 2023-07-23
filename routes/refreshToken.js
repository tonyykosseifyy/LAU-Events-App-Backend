const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshToken.js');


router.get('/', refreshTokenController.getAll);
// router.get('/:id', refreshTokenController.getOne);
// router.post('/', refreshTokenController.create);
// router.put('/:id', refreshTokenController.update);
// router.delete('/:id', refreshTokenController.deleteOne);

module.exports = router;