const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Questions = require("../Models/questionModel");
const Results = require("../Models/resultModel");
const { questions: questions, answers } = require("../database/data.js");

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

/** get all questions */
module.exports.getQuestion = async (req, res) => {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json(error);
  }
};

module.exports.randomQuestion = async (req, res) => {
  try {
    const q = await Questions.find();
    const shuffledQuestions = q.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 3);
    res.json(selectedQuestions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server Error" });
  }
};

/**insert all questions */
module.exports.insertQuestions = async (req, res) => {
  try {
    await Questions.create({ questions, answers });
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

module.exports.dropQuestions = async (req, res) => {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

//**result부분 */
module.exports.getResult = async (req, res) => {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
};

module.exports.storeResult = async (req, res) => {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username || !result) throw new Error("Data Not Provided...!");

    await Results.create({ username, result, attempts, points, achived });
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

module.exports.dropResult = async (req, res) => {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};
