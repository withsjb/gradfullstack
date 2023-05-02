import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import data, { answers } from "../database/data";
import { getServerData } from "../helper/helper";

/**redux actions */
import * as Action from "../redux/question_reducer";

/** fetch question hook to fetch api data and set value to store */

export const useFetchQuestions = () => {
  const dispatch = useDispatch();

  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /**async functions fetch backend data */
    (async () => {
      try {
        let question = await data;
        const q = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/questions`,
          (data) => data
        );
        console.log(q);

        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { question, answers } }));

          /**dispatch an action */
          dispatch(Action.startExamAction({ question, answers }));
        } else {
          throw new Error("No Question Avaliable");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

/**MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

/**PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
