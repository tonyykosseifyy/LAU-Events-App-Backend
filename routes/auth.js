const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

const { isAuthenticated } = require('../middlewares/authJwt');


router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/refreshToken', authController.refreshToken);
router.post('/signout',isAuthenticated, authController.signout);
router.post('/verify', authController.confirmationPost);
router.get('/confrimation/admin',isAuthenticated, authController.confirmationAdmin);


module.exports = router;