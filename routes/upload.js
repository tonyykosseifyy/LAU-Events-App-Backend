const express = require('express');
const uploadService = require('../services/multer.service');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/', uploadService.upload, imageController.uploadImage);

module.exports = router;
