import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../../styles/admin.module.css";

const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionToEdit, setQuestionToEdit] = useState({
    quizId: null,
    id: null,
    question: "",
    text: "",
    options: ["", "", "", ""],
    answer: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/questions");
      setQuizList(result.data);
    };
    fetchData();
  }, []);

  const getAnswer = (questionId, quiz) => {
    const question = quiz.questions.find((q) => q.id === questionId);
    return quiz.answers[quiz.questions.indexOf(question)];
  };

  const deleteQuestion = async (quizId, questionId) => {
    try {
      const result = await axios.delete(
        `http://localhost:4000/questions/${quizId}/${questionId}`
      );
      console.log(result.data); // 서버로부터 받은 응답 데이터 출력
      // 삭제 요청에 성공하면 quizList를 다시 불러옵니다.
      const updatedQuizList = await axios.get(
        "http://localhost:4000/questions"
      );
      setQuizList(updatedQuizList.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //update
  const openModal = (question) => {
    setSelectedQuestion(question);
    setQuestionToEdit(question);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setQuestionToEdit({
      quizId: null,
      id: null,
      question: "",
      text: "",
      options: ["", "", "", ""],
      answer: 0,
    });
    setModalIsOpen(false);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...questionToEdit.options];
    newOptions[index] = e.target.value;
    setQuestionToEdit({ ...questionToEdit, options: newOptions });
  };

  const handleChange = (e) => {
    setQuestionToEdit({ ...questionToEdit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveQuestion(questionToEdit);
  };

  const saveQuestion = async (editedQuestion) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/questions/${selectedQuestion.quizId}/${selectedQuestion.id}`,
        editedQuestion
      );
      console.log(result.data); // 서버로부터 받은 응답 데이터 출력
      // 수정 요청에 성공하면 quizList를 다시 불러옵니다.
      const updatedQuizList = await axios.get(
        "http://localhost:4000/questions"
      );
      setQuizList(updatedQuizList.data);
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={Styles.admincontainer}>
      {quizList.map((quiz) => (
        <div className={Styles.admincon} key={quiz._id}>
          <h3>id: {quiz._id}</h3>
          {quiz.questions.map((question) => (
            <div className={Styles.admindiv} key={question.id}>
              <h4 className={Styles.adminh4}>질문: {question.question}</h4>
              <p className={Styles.adminp}>텍스트: {question.text}</p>
              <ol>
                {question.options.map((option, index) => (
                  <li className={Styles.adminli} key={index}>
                    {option}
                  </li>
                ))}
              </ol>
              <p className={Styles.adminan}>
                정답: {getAnswer(question.id, quiz)}
              </p>
              <button
                onClick={() => deleteQuestion(quiz._id, question.id)}
                className={Styles.adminbtn}
              >
                삭제
              </button>
              <button
                onClick={() => openModal(question)} // 수정 버튼 클릭 시 openModal 함수를 호출합니다.
                className={Styles.adminbtn}
              >
                수정
              </button>
            </div>
          ))}
        </div>
      ))}

      {modalIsOpen && ( //모델 부분
        <div className={Styles.modal}>
          <h3>질문 수정하기</h3>
          <form onSubmit={handleSubmit}>
            <label>
              질문:
              <input
                type="text"
                name="question"
                value={questionToEdit.question}
                onChange={handleChange}
              />
            </label>
            <label>
              텍스트:
              <input
                type="text"
                name="text"
                value={questionToEdit.text}
                onChange={handleChange}
              />
            </label>
            {questionToEdit.options.map((option, index) => (
              <label key={index}>
                옵션 {index + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </label>
            ))}
            <label>
              정답:
              <select
                name="answer"
                value={questionToEdit.answer}
                onChange={handleChange}
              >
                {questionToEdit.options.map((option, index) => (
                  <option value={index} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">저장</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Quiz;
