const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = '../images/';

    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        return fs.mkdir(dir, { recursive: true }, (err) => {
          cb(err, dir);
        });
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
      return cb(new Error('Unsupported file type'), null);
    }

    const date = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${file.fieldname}-${date}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single('file');

module.exports = upload;
