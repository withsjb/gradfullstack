import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/problem")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };

  const handleChoiceSelect = (choice) => {
    if (choice === selectedProblem.answer) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  };
  return (
    <div>
      <h1>Question List</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <button onClick={() => handleProblemSelect(problem)}>
              {problem.title}
            </button>
          </li>
        ))}
      </ul>
      {selectedProblem && (
        <div>
          <h2>{selectedProblem.problem}</h2>
          <ul>
            {selectedProblem.choices.map((choice) => (
              <li key={choice}>
                <button onClick={() => handleChoiceSelect(choice)}>
                  {choice}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* return (
    <div className={Styles.main}>
      <Navbar />
      <h1>Problems</h1>
      <AddProblem onAdd={handleAddProblem} />
      {problems.map((problem) => (
        <div key={problem._id}>
          <h3>{problem.title}</h3>
          <h3>{problem.description}</h3>
          <p>Difficulty: {problem.difficulty}</p>
          <ul>
            {problem.choices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
          <p>정답: {problem.answer}</p>
        </div>
      ))}
    </div>
  );*/
