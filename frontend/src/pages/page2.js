import React from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Know.module.css";
import Modalknow from "../component/Modalknow";

export default function Page2() {
  return (
    <>
      <Navbar />
      <div className={Styles.body}>
        <div className={Styles.bookcase}>
          <Modalknow />
        </div>
        <div className={Styles.bookcase}>
          <Modalknow />
        </div>
        <div className={Styles.bookcase}>
          <Modalknow />
        </div>
      </div>
    </>
  );
}
