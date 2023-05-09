import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../../styles/admin.module.css";

const Quiz = () => {
  const [quizList, setQuizList] = useState([]);

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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
