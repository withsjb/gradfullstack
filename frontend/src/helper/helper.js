import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0); //맟추면 true를 통해서 i로 변환 i는 10으로 점수체크
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints;
}

/**check user auth */
export function CheckUserExit({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? (
    children
  ) : (
    <Navigate to={"/quizmain"} replace={true}></Navigate>
  );
}

/**get server data */
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
