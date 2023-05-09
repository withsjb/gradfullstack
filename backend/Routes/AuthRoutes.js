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
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

router.route("/quiz").get(getLatestQuestion).post(testQuestions);

router.delete("/questions/:quizId/:questionId", dropQuestions);

router
  .route("/questions")
  .get(getQuestion)
  .post(insertQuestions)
  .delete(dropQuestions);

router.route("/result").get(getResult).post(storeResult).delete(dropResult);

module.exports = router;
