const UserModel = require("../Models/UserModel");
const Problem = require("../Models/Problem");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  //errcode 11000이 가면 이미 이메일이 있다고 뜨게 하는중

  if (err.message === "incorrect Email")
    errors.email = " That email is not registered";

  if (err.message === "incorrect password")
    errors.email = " That password is incorrect";

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user.id);

    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.problem = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports.answer = async (req, res) => {
  const { problemId, answer } = req.body;
  try {
    const problem = await Problem.findById(problemId);
    if (problem.answer === answer) {
      res.send("정답입니다!");
    } else {
      res.send("오답입니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 에러");
  }
};

module.exports.addproblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports.returnproblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports.correctionproblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!problem) {
      return res.status(404).json({ msg: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports.deleteproblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: "Problem not found" });
    }
    res.json({ msg: "Problem deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
