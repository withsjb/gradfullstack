import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
