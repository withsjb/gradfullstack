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
                정답: {quiz.answers[question.id]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
