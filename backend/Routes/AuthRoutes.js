const {
  register,
  login,
  testQuestions,
  getQuestion,
  insertQuestions,
  dropQuestions,
  getResult,
  storeResult,
  dropResult,
  randomQuestion,
  getLatestQuestion,
  updatQuestion,
  getimg,
  saveimg,
  getwiki,
  addwiki,
  updatewiki,
  deletewiki,
  postterm,
  getterm,
  postwikiapp,
  getwikiapp,
  getwikiterm,
  applinux,
  getlinux,
  addContent,
  deleteContent,
  getFile,
  addPhoto,
  getphoto,
  updatecontent,
  gettestbedFile,
  uploadtestbedFile,
  deletetestbedFile,
  downloadfile,
  getboard,
  postboard,
  deleteboard,
  putboard,
  getpostdetail,
  getcomments,
  postcomments,
  WinpostQuestions,
  WingetQuestion,
  WinupdatQuestion,
  WindropQuestions,
  getwindow,
  postwindow,
  getwinFile,
  windeleteContent,
  winupdatecontent,
  winaddContent,
  wingetphoto,
  winaddPhoto,
  likes,
  getuser,
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const uploadMiddleware = require("../Middlewares/MulterMiddleware");
const fileMiddleware = require("../Middlewares/FileMiddleware");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.get("/", getuser);
router.post("/register", register);
router.post("/login", login);

router
  .route("/quiz")
  .get(getLatestQuestion)
  .post(uploadMiddleware.single("photo"), testQuestions);

router
  .route("/winquiz")
  .get(WingetQuestion)
  .post(uploadMiddleware.single("photo"), WinpostQuestions);

router
  .route("/winquiz/:quizId/:questionId")
  .delete(WindropQuestions)
  .put(uploadMiddleware.single("photo"), WinupdatQuestion);

router
  .route("/questions/:quizId/:questionId")
  .delete(dropQuestions)
  .put(uploadMiddleware.single("photo"), updatQuestion);

router
  .route("/questions")
  .get(getQuestion)
  .post(insertQuestions)
  .delete(dropQuestions);

router.route("/result").get(getResult).post(storeResult).delete(dropResult);

router
  .route("/upload")
  .get(getimg)
  .post(uploadMiddleware.single("photo"), saveimg);

router.route("/word").get(getwiki).post(addwiki);

router.route("/terms").get(getterm).post(postterm);

router.route("/wikiapp").get(getwikiapp).post(postwikiapp);

router.route("/term/:word").get(getwikiterm);
//리눅스 파일
router.route("/linux/files").get(getlinux).post(applinux);

router.route("/linux/files/:fileId").get(getFile);

router
  .route("/linux/files/:fileId/content")
  .post(uploadMiddleware.single("photo"), addContent);

router
  .route("/linux/files/:fileId/content/:index")
  .delete(deleteContent)
  .put(uploadMiddleware.single("photo"), updatecontent);

router
  .route("/linux/files/:fileId/addphoto")
  .get(getphoto)
  .post(uploadMiddleware.single("photo"), addPhoto);

//window파일
router.route("/win/files").get(getwindow).post(postwindow);

router.route("/win/files/:fileId").get(getwinFile);

router
  .route("/win/files/:fileId/content")
  .post(uploadMiddleware.single("photo"), winaddContent);

router
  .route("/win/files/:fileId/content/:index")
  .delete(windeleteContent)
  .put(uploadMiddleware.single("photo"), winupdatecontent);

router
  .route("/win/files/:fileId/addphoto")
  .get(wingetphoto)
  .post(uploadMiddleware.single("photo"), winaddPhoto);

//testbed
router
  .route("/testbedfile")
  .get(gettestbedFile)
  .post(fileMiddleware.single("zipfile"), uploadtestbedFile);

router
  .route("/testbedfile/:filename")
  .get(downloadfile)
  .delete(deletetestbedFile);

router.route("/board").get(getboard).post(postboard);

router.route("/board/:id").get(getpostdetail).delete(deleteboard).put(putboard);

router.route("/board/:id/comments").get(getcomments).post(postcomments);

router.route("/board/:id/like").post(likes);

module.exports = router;
