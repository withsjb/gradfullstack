const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/zip");
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    } else {
      cb(null, null);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "application/zip",
    "application/x-zip-compressed",
    "application/x-7z-compressed",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .zip files are allowed."));
  }
};

const fileMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1000000 * 1024, // 5000000 KB (5000MB, 5GB)
  },
});

module.exports = fileMiddleware;
