import React, { useState } from "react";
import Styles from "../../styles/roaddetail.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Roaddetail() {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className={Styles.body}>
      <div className={Styles.menu}>
        <div
          onClick={() => setIsopen((prev) => !prev)}
          className={Styles.intro}
        >
          <h2> Introduce </h2>
          {!isOpen ? (
            <i className={Styles.icon}>
              {" "}
              <FontAwesomeIcon icon={faCaretDown} />{" "}
            </i>
          ) : (
            <i className={Styles.icon}>
              {" "}
              <FontAwesomeIcon icon={faCaretUp} />
            </i>
          )}
        </div>

        {isOpen && (
          <div>
            <h1 className={Styles.intro}>소개</h1>
            <h1 className={Styles.intro}>소개2</h1>
          </div>
        )}
      </div>
    </div>
  );
}
