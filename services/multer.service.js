const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../images/')
  },
  filename: function (req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, '-');
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${date}${extension}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
