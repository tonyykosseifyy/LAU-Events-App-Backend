const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

const { isAuthenticated } = require('../middlewares/authJwt');


router.post('/signin', authController.signin);
router.post('/refreshToken', authController.refreshToken);
router.post('/signout',isAuthenticated, authController.signout);
router.get('/confirmation/:userId/:token', authController.confirmationPost);
router.get('/confrimation/admin',isAuthenticated, authController.confirmationAdmin);


module.exports = router;