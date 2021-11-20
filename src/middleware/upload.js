const multer = require('multer');
const path = require('path');
const { failed } = require('../helpers/respon');
// konfigurasi multer
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      if (file !== undefined) {
        const ext = path.extname(file.originalname);
        cb(null, `${Math.round(Math.random() * 1E9)}${ext}`);
      } else {
        console.log('hai');
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file !== undefined) {
      const ext = path.extname(file.originalname);
      if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
        cb(null, true);
      } else {
        const error = {
          message: 'Error type file',
        };
        cb(error, false);
      }
    } else {
      console.log('hai');
    }
  },
  limits: { fileSize: 80 * 1000 * 1000 },
});

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('image');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, 401, err);
    } else {
      next();
    }
  });
};

module.exports = upload;
