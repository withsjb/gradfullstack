import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate(); //링크 이동 로그인하면 메인으로 이동되게 36줄 부분으로 "/"로 이동
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" }); //데이터를 보내는 바디 부분
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true } //백에 cors랑 연동되는 부분 서로 다른 도메인에 요청을 보낼때 credential(쿠키첨부)정보 담아서 보내기
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/"); //err 가없어 else 로 빠지면 메인으로 가게
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={Styles.body}>
      <div className={Styles.container}>
        <div className={Styles.title}>
          <h2 className={Styles.titleh2}> Cyber Guardian </h2>
          <span className={Styles.resub}> Register </span>
        </div>
        <form className={Styles.forma} onSubmit={(e) => handleSubmit(e)}>
          <div className={Styles.formbox}>
            <label className={Styles.lglabel} htmlFor="email">
              Email
            </label>
            <input
              className={Styles.inputem}
              type="email"
              name="email"
              placeholder=" abcd@email.co.kr"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={Styles.formbox}>
            <label className={Styles.lglabel} htmlFor="password">
              Password
            </label>
            <input
              className={Styles.inputpa}
              type="password"
              name="password"
              placeholder=" 대,소문자 구분 6~12자리 입력"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className={Styles.rgbtn} type="submit">
            {" "}
            가입하기{" "}
            <i className={Styles.icon}>
              <FontAwesomeIcon icon={faFilePen} />
            </i>
          </button>
          <span>
            이미 계정이 있으신가요 ?
            <Link className={Styles.go_lg} to="/login">
              로그인하기{" "}
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
