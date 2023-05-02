import React, { useState } from "react";
import Styles from "../../styles/Quizmain.module.css";
import Questions from "./Questions";

import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/FetchQuestion";

/**redux store import */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PushAnswer } from "../../hooks/setResult";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  // const trace = useSelector((state) => state.questions.trace);

  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(result);
  });

  /*next 버튼 핸들러 */
  function onNext() {
    console.log("On next click");
    /** update the trace value by one using movenextaction*/
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      /**insert a new result in the array */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    /**reset the value of the checked variable*/
    setChecked(undefined);
  }
  /*prev 버튼 핸들러 */
  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  /**finished exam after the question */
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace="tr"></Navigate>;
  }

  return (
    <>
      <div className={Styles.container}>
        <h1 className={Styles.title}>Quiz Application</h1>
        {/*display questions */}
        <Questions onChecked={onChecked} />
        <div className={Styles.grid}>
          {trace > 0 ? (
            <button className={Styles.prev} onClick={onPrev}>
              Prev
            </button>
          ) : (
            <div></div>
          )}
          <button className={Styles.next} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
