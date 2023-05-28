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
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const uploadMiddleware = require("../middlewares/MulterMiddleware");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

router.route("/quiz").get(getLatestQuestion).post(testQuestions);

router
  .route("/questions/:quizId/:questionId")
  .delete(dropQuestions)
  .put(updatQuestion);

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

module.exports = router;
