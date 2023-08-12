const uploadService = require('../services/multer.service');
const imageController = require('../controllers/imageController');

router.post('/upload', uploadService.single('image'), imageController.uploadImage);
