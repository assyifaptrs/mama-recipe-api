const multer = require('multer');
const path = require('path');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      const fileName = `${Date.now()}${ext}`;
      cb(null, fileName);
    },
  }),

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == '.png') {
      cb(null, true);
    } else if (ext == '.jpeg') {
      cb(null, true);
    } else if (ext == '.jpg') {
      cb(null, true);
    } else if (ext == '.mp4') {
      cb(null, true);
    } else if (ext == '.mov') {
      cb(null, true);
    } else if (ext == '.avi') {
      cb(null, true);
    } else if (ext == '.svg') {
      cb(null, true);
    } else {
      const error = {
        message: 'file must be JPG, PNG, SVG, MP4, MOV, or AVI',
      };
      cb(error, false);
    }
  },
  limits: {
    fileSize: 20000000, // maksimum 20MB
  },
});

const multerFields = multerUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);
const upload = (req, res, next) => {
  multerFields(req, res, (err) => {
    if (err) {
      res.json({
        message: 'error when upload file',
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = upload;

