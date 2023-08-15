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
  getFile,
  addPhoto,
  getphoto,
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const uploadMiddleware = require("../middlewares/MulterMiddleware");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

router
  .route("/quiz")
  .get(getLatestQuestion)
  .post(uploadMiddleware.single("photo"), testQuestions);

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

router.route("/linux/files").get(getlinux).post(applinux);

router.route("/linux/files/:fileId").get(getFile);

router
  .route("/linux/files/:fileId/content")
  .post(uploadMiddleware.single("photo"), addContent)
  .delete();

router
  .route("/linux/files/:fileId/addphoto")
  .get(getphoto)
  .post(uploadMiddleware.single("photo"), addPhoto);

module.exports = router;
