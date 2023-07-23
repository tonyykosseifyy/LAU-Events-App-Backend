const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");


router.post('/auth/signin', authController.signin);
router.post('/auth/refreshToken', authController.refreshToken);


module.exports = router;
