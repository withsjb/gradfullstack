const {
  register,
  login,
  returnproblem,
  addproblem,
  deleteproblem,
  correctionproblem,
  getQuestion,
  insertQuestions,
  dropQuestions,
  getResult,
  storeResult,
  dropResult,
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const { problem } = require("../Controllers/AuthControllers");
const { answer } = require("../Controllers/AuthControllers");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

router
  .route("/questions")
  .get(getQuestion)
  .post(insertQuestions)
  .delete(dropQuestions);
router.route("/result").get(getResult).post(storeResult).delete(dropResult);

module.exports = router;
