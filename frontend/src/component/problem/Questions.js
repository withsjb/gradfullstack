import React from "react";
import { useState } from "react";
import Styles from "../../styles/Quizmain.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Custom Hook */
import { useFetchQuestions } from "../../hooks/FetchQuestion";

import { updateResult } from "../../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestions();

  //useSelector((state) => console.log(state)); //상태 콘솔로그 찍기

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className={Styles.textlight}>isLoading</h3>;
  if (serverError)
    return (
      <h3 className={Styles.textlight}>{serverError || "Unknown Error"}</h3>
    );

  return (
    <div className={Styles.questions}>
      <h2 className={Styles.textlight}>{questions?.questions1}</h2>
      <h2 className={Styles.textlight}>{questions?.text}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className={Styles.textprimary} htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div className={Styles.check}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
