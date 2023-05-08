import React, { useState } from "react";
import axios from "axios";
import Getquestion from "../component/admin/getquestion";

const AddQuestion = () => {
  const [id, setId] = useState(1);
  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/quiz", {
        question: {
          id: id,
          question: question,
          text: text,
          options: options,
        },
        answer: parseInt(answer),
      });
      console.log(response.data);
      setId(id + 1);
      setAnswer("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
    setAnswer(index);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">질문:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="text">텍스트:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="option1">선택지 1:</label>
          <input
            type="text"
            id="option1"
            value={options[0]}
            onChange={(event) => handleOptionChange(event, 0)}
          />
        </div>
        <div>
          <label htmlFor="option2">선택지 2:</label>
          <input
            type="text"
            id="option2"
            value={options[1]}
            onChange={(event) => handleOptionChange(event, 1)}
          />
        </div>
        <div>
          <label htmlFor="option3">선택지 3:</label>
          <input
            type="text"
            id="option3"
            value={options[2]}
            onChange={(event) => handleOptionChange(event, 2)}
          />
        </div>
        <div>
          <label htmlFor="option4">선택지 4:</label>
          <input
            type="text"
            id="option4"
            value={options[3]}
            onChange={(event) => handleOptionChange(event, 3)}
          />
        </div>
        <div>
          <label htmlFor="answer">정답:</label>
          <select
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          >
            <option value={0}>선택지 1</option>
            <option value={1}>선택지 2</option>
            <option value={2}>선택지 3</option>
            <option value={3}>선택지 4</option>
          </select>
        </div>
        <button type="submit">추가하기</button>
      </form>

      <Getquestion />
    </>
  );
};

export default AddQuestion;
