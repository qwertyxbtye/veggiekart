const multer = require("multer");

function handleImgUpload(path) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  return upload
}

module.exports = handleImgUpload