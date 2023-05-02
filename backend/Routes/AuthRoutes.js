const {
  register,
  login,
  returnproblem,
  addproblem,
  deleteproblem,
  correctionproblem,
} = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");
const { problem } = require("../Controllers/AuthControllers");
const { answer } = require("../Controllers/AuthControllers");

//자동생성 되는거보니 기능인듯

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/problem", addproblem);
router.get("/problem", problem);

router.post("/answer", answer);
router.get("/problem:id", returnproblem);
router.put("/problem:id", correctionproblem);
router.delete("/problem:id", deleteproblem);

module.exports = router;
