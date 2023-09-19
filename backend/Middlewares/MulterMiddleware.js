const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIAWT2IDLWJE4QW76HK",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jinbin11",
    contentType: multerS3.AUTO_CONTENT_TYPE, // 파일의 Content-Type 자동 설정
    acl: "public-read", // 업로드된 파일을 public으로 설정 (권한을 조절해야 할 수 있습니다)
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/bmp",
    ];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadMiddleware = upload;

module.exports = uploadMiddleware;
