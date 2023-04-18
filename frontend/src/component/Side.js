import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Styles from "../styles/Linuxstudy.module.css";

const SideDiv = styled.div``;

const Side = () => {
  return (
    <SideDiv className={Styles.side}>
      <div>
        <Link to="1" spy={true} smooth={true}>
          <span className={Styles.sidespan}>1.학습개요</span>
        </Link>
        <Link to="2" spy={true} smooth={true}>
          <span className={Styles.sidespan}>2.점검 및 조치</span>
        </Link>
        <Link to="3" spy={true} smooth={true}>
          <span className={Styles.sidespan}>3.조치 요약</span>
        </Link>
        <Link to="4" spy={true} smooth={true}>
          <span className={Styles.sidespan}>4.문제 풀이</span>
        </Link>
      </div>
    </SideDiv>
  );
};

export default Side;
