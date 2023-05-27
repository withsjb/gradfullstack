const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Questions = require("../Models/questionModel");
const Results = require("../Models/resultModel");
const { questions: questions, answers } = require("../database/data.js");
const _ = require("lodash");

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
    const questions = await Questions.find({});
    const randomQuestions = _.sampleSize(questions, 3);
    res.send(randomQuestions);
  } catch (err) {
    res.send(err);
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
//마지막 추가된 데이터 확인
module.exports.getLatestQuestion = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    if (!questions) {
      return res.status(404).json({ error: "No questions found" });
    }
    const lastQuestion = questions[0];
    const lastQuestionId = lastQuestion ? lastQuestion.questions[0].id : 0;
    res.status(200).json({ lastQuestionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//데이터 추가
module.exports.testQuestions = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const existingQuestion = await Questions.findById(
      "6457657013cecfa83bb71dde"
    ); // 이전에 생성한 데이터의 ID를 사용
    existingQuestion.questions.push(question); // 기존의 questions 배열에 새로운 질문 추가
    existingQuestion.answers.push(answer); // 기존의 answers 배열에 새로운 답변 추가
    const updatedQuestion = await existingQuestion.save(); // 업데이트된 질문 저장
    res.json({
      msg: "Question Updated Successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports.dropQuestions = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    // find the question to delete from the quiz
    const quiz = await Questions.findById(quizId);
    const questionIndex = quiz.questions.findIndex((q) => q.id === questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ message: "Question not found" });
    }
    // remove the question and answer from the quiz
    quiz.questions.splice(questionIndex, 1);
    quiz.answers.splice(questionIndex, 1);
    await quiz.save();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updatQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { question, text, options, answer } = req.body;

    // Find the quiz
    const quiz = await Questions.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Find the question to update
    const questionIndex = quiz.questions.findIndex((q) => q.id === questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the question and answer
    const updatedQuestion = {
      id: questionId,
      question,
      text,
      options,
    };
    quiz.questions[questionIndex] = updatedQuestion;
    quiz.answers[questionIndex] = answer;

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuiz.questions[questionIndex],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
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
