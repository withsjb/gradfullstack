const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Questions = require("../Models/questionModel");
const WinQuestion = require("../Models/WinproblemModel");
const Results = require("../Models/resultModel");
const path = require("path");
const fs = require("fs");
const Term = require("../Models/TermModel");
const Wikiapp = require("../Models/wikiappModel");
const LinuxFile = require("../Models/linuxfileModel");
const WinFile = require("../Models/winfileModel");
const { questions: questions, answers, photo } = require("../database/data.js");
const _ = require("lodash");
const UploadModel = require("../Models/UploadModel");
const File = require("../Models/fileuploadModel");
const Board = require("../Models/boardModel");

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

module.exports.getuser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password, role: "user" });
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

/**insert all questions */
module.exports.insertQuestions = async (req, res) => {
  try {
    await Questions.create({ questions, answers, photo });
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};
//마지막 추가된 데이터 확인
module.exports.getLatestQuestion = async (req, res) => {
  try {
    const questions = await Questions.find().sort({ createdAt: -1 });
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
    const { questions, answers } = JSON.parse(req.body.questions);

    const existingQuestion = await Questions.findById(
      "647c283a10a55bafa6e495df"
    );

    questions.forEach((questionData) => {
      existingQuestion.questions.push(questionData);
    });
    answers.forEach((answerData) => {
      existingQuestion.answers.push(answerData);
    });

    if (req.file && req.file.filename) {
      const { filename } = req.file;
      existingQuestion.photo.push(filename);
    } else {
      existingQuestion.photo.push(null); // 수정: null 값으로 추가
    }

    const updatedQuestion = await existingQuestion.save();

    res.json({
      msg: "Question Updated Successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    if (Number(answer) === 0) {
      quiz.answers[questionIndex] = 0; // 정답이 1번일 때는 1로 설정
    } else {
      quiz.answers[questionIndex] = parseInt(answer, 10); // 나머지 경우는 answer를 그대로 저장
    }

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuiz.questions[questionIndex],
      answers: updatedQuiz.answers,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//window문제
module.exports.WingetQuestion = async (req, res) => {
  try {
    const q = await WinQuestion.find();
    res.json(q);
  } catch (error) {
    res.json(error);
  }
};

module.exports.WinpostQuestions = async (req, res) => {
  try {
    const { questions, answers } = JSON.parse(req.body.questions);

    const existingQuestion = await WinQuestion.findById(
      "64eac6339f498c9e6e317237"
    );

    questions.forEach((questionData) => {
      existingQuestion.questions.push(questionData);
    });
    answers.forEach((answerData) => {
      existingQuestion.answers.push(answerData);
    });

    if (req.file && req.file.filename) {
      const { filename } = req.file;
      existingQuestion.photo.push(filename);
    } else {
      existingQuestion.photo.push(null); // 수정: null 값으로 추가
    }

    const updatedQuestion = await existingQuestion.save();

    res.json({
      msg: "Question Updated Successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.WindropQuestions = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    // find the question to delete from the quiz
    const quiz = await WinQuestion.findById(quizId);
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

module.exports.WinupdatQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { question, text, options, answer } = req.body;

    // Find the quiz
    const quiz = await WinQuestion.findById(quizId);
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

    if (Number(answer) === 0) {
      quiz.answers[questionIndex] = 0; // 정답이 1번일 때는 1로 설정
    } else {
      quiz.answers[questionIndex] = parseInt(answer, 10); // 나머지 경우는 answer를 그대로 저장
    }

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuiz.questions[questionIndex],
      answers: updatedQuiz.answers,
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

module.exports.getimg = async (req, res) => {
  try {
    const allPhotos = await UploadModel.find().sort({
      createdAt: "descending",
    });
    res.send(allPhotos);
  } catch (error) {
    res.json({ error });
  }
};

module.exports.saveimg = async (req, res) => {
  try {
    const photo = req.file.filename;

    console.log(photo);

    UploadModel.create({ photo }).then((data) => {
      console.log("Uploaded Successfully...");
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    res.json({ error });
  }
};

//wiki추가
module.exports.getwiki = async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.word });
    res.json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
  }
};

module.exports.addwiki = async (req, res) => {
  try {
    const { word, description } = req.body;
    const newWord = new Word({ word, description });
    await newWord.save();
    res.json(newWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
  }
};

//tern추가
module.exports.getterm = async (req, res) => {
  const terms = await Term.find();
  res.json(terms);
};

module.exports.postterm = async (req, res) => {
  const { term, definition } = req.body;
  const newTerm = new Term({ term, definition });
  const savedTerm = await newTerm.save();
  res.json(savedTerm);
};

//wikiapp
module.exports.postwikiapp = async (req, res) => {
  try {
    const { Name, Text } = req.body;
    const newEntry = new Wikiapp({ Name, Text });
    await newEntry.save();
    res.status(200).send("정보가 성공적으로 추가되었습니다.");
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
};

module.exports.getwikiapp = async (req, res) => {
  try {
    const entries = await Wikiapp.find({});
    res.status(200).json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
};

module.exports.getwikiterm = async (req, res) => {
  try {
    const { word } = req.params;
    const term = await Term.findOne({ term: word });
    if (term) {
      res.status(200).json(term);
    } else {
      res.status(404).send("단어를 찾을 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
};

//linuxfile추가

module.exports.applinux = async (req, res) => {
  try {
    const { name, content } = req.body;
    const newLinuxFile = await LinuxFile.create({ name, content });

    res.status(201).json({
      _id: newLinuxFile._id, // 파일의 id를 반환
      name: newLinuxFile.name,
      content: newLinuxFile.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add file" });
  }
};

module.exports.getlinux = async (req, res) => {
  try {
    const files = await LinuxFile.find({}, { content: 0 }); // 컨텐츠 필드는 제외하고 조회
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("파일 목록 가져오기 실패");
  }
};

module.exports.getFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await LinuxFile.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get file");
  }
};

module.exports.addContent = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { concept, content } = req.body;
    const photo = req.file; // 업로드된 사진 파일

    const updateObject = {
      $push: {
        concept: concept !== null ? concept : [], // 빈 문자열인 경우에도 배열로 설정
        content: content !== null ? content : "",
        photo: photo ? photo.filename : "",
      },
    };

    const updatedFile = await LinuxFile.findByIdAndUpdate(
      fileId,
      updateObject,
      { new: true }
    );

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add content and photo to file");
  }
};

module.exports.deleteContent = async (req, res) => {
  try {
    const { fileId, index } = req.params;
    console.log("Received index:", index);
    const updatedFile = await LinuxFile.findByIdAndUpdate(
      fileId,
      {
        $unset: {
          [`concept.${index}`]: 1,
          [`content.${index}`]: 1,
          [`photo.${index}`]: 1,
        },
      },
      { new: true }
    );

    await LinuxFile.findByIdAndUpdate(fileId, {
      $pull: {
        concept: null,
        content: null,
        photo: null,
      },
    });

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete content");
  }
};

module.exports.updatecontent = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const index = req.params.index;
    const updatedContent = req.body.content;
    const updatedConcept = req.body.concept;
    const updatedPhoto = req.file; // 수정한 사진 가져오기

    const fileToUpdate = await LinuxFile.findById(fileId);

    if (!fileToUpdate) {
      return res.status(404).json({ error: "File not found." });
    }

    if (index < 0 || index >= fileToUpdate.content.length) {
      return res.status(400).json({ error: "Invalid index." });
    }

    fileToUpdate.content[index] = updatedContent;
    fileToUpdate.concept[index] = updatedConcept;

    if (updatedPhoto) {
      // 새로운 사진 업로드한 경우에만 처리
      const photoURL = `${updatedPhoto.filename}`;
      fileToUpdate.photo[index] = photoURL;
    }

    await fileToUpdate.save();

    res.json(fileToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating content." });
  }
};

module.exports.addPhoto = async (req, res) => {
  try {
    const { fileId } = req.params;
    const photo = req.file; // 업로드된 사진 파일

    const updatedFile = await LinuxFile.findByIdAndUpdate(
      fileId,
      {
        $push: { photo: photo.filename },
      },
      { new: true }
    );

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add photo to file");
  }
};

module.exports.getphoto = async (req, res) => {
  try {
    const file = await LinuxFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ photos: file.photo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//window파일추가
module.exports.getwindow = async (req, res) => {
  try {
    const files = await WinFile.find({}, { content: 0 }); // 컨텐츠 필드는 제외하고 조회
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("파일 목록 가져오기 실패");
  }
};

module.exports.postwindow = async (req, res) => {
  try {
    const { name, content } = req.body;
    const newLinuxFile = await WinFile.create({ name, content });

    res.status(201).json({
      _id: newLinuxFile._id, // 파일의 id를 반환
      name: newLinuxFile.name,
      content: newLinuxFile.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add file" });
  }
};

module.exports.getwinFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await WinFile.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to get file");
  }
};

module.exports.winaddContent = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { concept, content } = req.body;
    const photo = req.file; // 업로드된 사진 파일

    const updateObject = {
      $push: {
        concept: concept !== null ? concept : [], // 빈 문자열인 경우에도 배열로 설정
        content: content !== null ? content : "",
        photo: photo ? photo.filename : "",
      },
    };

    const updatedFile = await WinFile.findByIdAndUpdate(fileId, updateObject, {
      new: true,
    });

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add content and photo to file");
  }
};

module.exports.windeleteContent = async (req, res) => {
  try {
    const { fileId, index } = req.params;
    console.log("Received index:", index);
    const updatedFile = await WinFile.findByIdAndUpdate(
      fileId,
      {
        $unset: {
          [`concept.${index}`]: 1,
          [`content.${index}`]: 1,
          [`photo.${index}`]: 1,
        },
      },
      { new: true }
    );

    await WinFile.findByIdAndUpdate(fileId, {
      $pull: {
        concept: null,
        content: null,
        photo: null,
      },
    });

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete content");
  }
};

module.exports.winupdatecontent = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const index = req.params.index;
    const updatedContent = req.body.content;
    const updatedConcept = req.body.concept;
    const updatedPhoto = req.file; // 수정한 사진 가져오기

    const fileToUpdate = await WinFile.findById(fileId);

    if (!fileToUpdate) {
      return res.status(404).json({ error: "File not found." });
    }

    if (index < 0 || index >= fileToUpdate.content.length) {
      return res.status(400).json({ error: "Invalid index." });
    }

    fileToUpdate.content[index] = updatedContent;
    fileToUpdate.concept[index] = updatedConcept;

    if (updatedPhoto) {
      // 새로운 사진 업로드한 경우에만 처리
      const photoURL = `${updatedPhoto.filename}`;
      fileToUpdate.photo[index] = photoURL;
    }

    await fileToUpdate.save();

    res.json(fileToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating content." });
  }
};

module.exports.wingetphoto = async (req, res) => {
  try {
    const file = await WinFile.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ photos: file.photo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.winaddPhoto = async (req, res) => {
  try {
    const { fileId } = req.params;
    const photo = req.file; // 업로드된 사진 파일

    const updatedFile = await WinFile.findByIdAndUpdate(
      fileId,
      {
        $push: { photo: photo.filename },
      },
      { new: true }
    );

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add photo to file");
  }
};

//파일 가져오기
module.exports.gettestbedFile = async (req, res) => {
  try {
    const links = await File.find();
    res.json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

//파일 업로드
module.exports.uploadtestbedFile = async (req, res) => {
  try {
    const { title, url } = req.body;
    const newFile = new File({ title, url });
    await newFile.save();
    res.json(newFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

module.exports.deletetestbedFile = async (req, res) => {
  try {
    const { id } = req.params;
    await File.findByIdAndDelete(id);
    res.json({ message: "링크 삭제 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

module.exports.downloadfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const updatedFile = await File.findByIdAndUpdate(
      id,
      { title, url },
      { new: true }
    );
    res.json(updatedFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
};

//게시판
module.exports.getboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const totalPosts = await Board.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const posts = await Board.find().skip(startIndex).limit(pageSize);

    res.json({
      page,
      pageSize,
      totalPosts,
      totalPages, // 전체 페이지 수
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.postboard = async (req, res) => {
  try {
    const post = new Board(req.body);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteboard = async (req, res) => {
  try {
    const deletedPost = await Board.findByIdAndRemove(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    res.json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.putboard = async (req, res) => {
  try {
    const updatedPost = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getpostdetail = async (req, res) => {
  try {
    const post = await Board.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    post.views++;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//게시판 댓글

module.exports.getcomments = async (req, res) => {
  try {
    const post = await Board.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.postcomments = async (req, res) => {
  try {
    const post = await Board.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    post.comments.push({ text: req.body.text });
    const updatedPost = await post.save();
    res.status(201).json(updatedPost.comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.likes = async (req, res) => {
  try {
    const post = await Board.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    post.likes++;
    await post.save();
    res.status(200).json({ message: "좋아요가 추가되었습니다." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
