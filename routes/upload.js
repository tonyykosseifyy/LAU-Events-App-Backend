const express = require('express');
const uploadService = require('../services/multer.service');
const imageController = require('../controllers/imageController');
const router = express.Router();
const validate = require('../middlewares/validate.js');

router.post('/', uploadService.upload, uploadService.fileValidation, imageController.uploadImage);


module.exports = router;
