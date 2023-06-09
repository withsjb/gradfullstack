import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import Styles from "../styles/Login.module.css";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
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
          <h2>Log in </h2>
        </div>
        <form className={Styles.forma} onSubmit={(e) => handleSubmit(e)}>
          <div className={Styles.formbox}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=" abcd@email.co.kr"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={Styles.formbox}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder=" Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className={Styles.libtn} type="submit">
            Log in
          </button>
          <span>
            Don't have an account ?<Link to="/register"> Register </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
