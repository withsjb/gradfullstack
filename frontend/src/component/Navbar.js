import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Styles from "../styles/Header.module.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useCookies } from "react-cookie";
import axios from "axios";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]); //usestate로 변수 2개 설정 가능한듯
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <nav className={Styles.navbar}>
        <Link to="/">
          <h3 className={Styles.logo}>
            <img src="images/secu.png"></img> Logo
          </h3>
        </Link>
        <ul
          className={Mobile ? Styles.navlinksmobile : Styles.navlinks}
          onClick={() => setMobile(false)}
        >
          <li className={Styles.navli}>
            roadmap
            <ul className={Styles.dropmenu}>
              <Link to="/roadmap">
                {" "}
                <li>roadmap1</li>{" "}
              </Link>
              <Link to="/linuxstudy">
                {" "}
                <li>linuxstudy</li>
              </Link>
              <Link to="/select">
                <li>select</li>
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            wargame
            <ul className={Styles.dropmenu}>
              <Link to="/problem">
                {" "}
                <li>wargame1</li>{" "}
              </Link>
              <li>wargame2</li>
              <li>wargame3</li>
            </ul>{" "}
          </li>

          <Link to="/">
            <li className={Styles.navli}>
              community
              <ul className={Styles.dropmenu}>
                <li>community1</li>
                <li>community2</li>
                <li>community3</li>
              </ul>{" "}
            </li>
          </Link>
          <Link to="/">
            <li className={Styles.navli}>login</li>
          </Link>
          <button onClick={logOut}>Log out</button>
        </ul>
        <button
          className={Styles.mobilemenu}
          onClick={() => setMobile(!Mobile)}
        >
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;