const express = require('express');
const uploadService = require('../services/multer.service');
const imageController = require('../controllers/imageController');
const router = express.Router();
const validate = require('../middlewares/validate.js');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload operations
 */

/**
 * @swagger
 * /upload/:
 *  post:
 *    tags: [Upload]
 *    summary: Upload an image
 *    description: Upload an image file (jpeg, jpg, or png) with a maximum size of 5 MB
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *                description: The file to upload
 *    responses:
 *      '200':
 *        description: Successfully uploaded the image
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                filename:
 *                  type: string
 *                message:
 *                  type: string
 *                  example: 'Image uploaded successfully'
 *      '400':
 *        description: Image file is required or Only images are allowed
 *      '500':
 *        description: Server error
 */

router.post('/', uploadService.upload, uploadService.fileValidation, imageController.uploadImage);

module.exports = router;
