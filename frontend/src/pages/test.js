import React, { useState } from "react";
import Styles from "../styles/Test.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const FileLoader = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpena, setIsOpena] = useState(false);
  const [isOpenb, setIsOpenb] = useState(false);
  const [isOpenc, setIsOpenc] = useState(false);
  const [isOpend, setIsOpend] = useState(false);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  let content;
  if (selectedMenu === "home") {
    content = <HomeContent />;
  } else if (selectedMenu === "id") {
    content = <IdContent />;
  } else if (selectedMenu === "id2") {
    content = <IdContenta />;
  } else if (selectedMenu === "id3") {
    content = <IdContentb />;
  } else if (selectedMenu === "id4") {
    content = <IdContentc />;
  } else if (selectedMenu === "settings") {
    content = <SettingsContent />;
  } else if (selectedMenu === "testbed") {
    content = <TestbedContent />;
  }

  return (
    <div className={Styles.root}>
      <Navbar />
      <div className={Styles.contentContainer}>
        <div className={Styles.sidebar}>
          <div>
            <ul
              onClick={() => setIsOpen((prev) => !prev)}
              className={Styles.intro}
            >
              사전지식
              {!isOpen ? (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </i>
              ) : (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </i>
              )}
            </ul>
            {isOpen && (
              <li
                href="#"
                className={selectedMenu === "home" ? Styles.active : ""}
                onClick={() => handleMenuClick("home")}
              >
                사전지식1
              </li>
            )}
          </div>

          <div>
            <ul
              onClick={() => setIsOpena((prev) => !prev)}
              className={Styles.intro}
            >
              학습내용
              {!isOpena ? (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </i>
              ) : (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </i>
              )}
            </ul>
            {isOpena && (
              <>
                <li
                  href="#"
                  className={selectedMenu === "id" ? Styles.active : ""}
                  onClick={() => handleMenuClick("id")}
                >
                  계정관리
                </li>
                <li
                  href="#"
                  className={selectedMenu === "id2" ? Styles.active : ""}
                  onClick={() => handleMenuClick("id2")}
                >
                  파일 및 디렉터리 관리
                </li>
                <li
                  href="#"
                  className={selectedMenu === "id3" ? Styles.active : ""}
                  onClick={() => handleMenuClick("id3")}
                >
                  서비스 관리
                </li>
                <li
                  href="#"
                  className={selectedMenu === "profile" ? Styles.active : ""}
                  onClick={() => handleMenuClick("profile")}
                >
                  패치 관리
                </li>
                <li
                  href="#"
                  className={selectedMenu === "profile" ? Styles.active : ""}
                  onClick={() => handleMenuClick("profile")}
                >
                  로그 관리
                </li>
              </>
            )}
          </div>

          <div>
            <ul
              onClick={() => setIsOpenc((prev) => !prev)}
              className={Styles.intro}
            >
              마지막 결산 문제
              {!isOpenc ? (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </i>
              ) : (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </i>
              )}
            </ul>
            {isOpenc && (
              <li
                href="#"
                className={selectedMenu === "id4" ? Styles.active : ""}
                onClick={() => handleMenuClick("id4")}
              >
                메인 퀴즈
              </li>
            )}
          </div>

          <div>
            <ul
              onClick={() => setIsOpend((prev) => !prev)}
              className={Styles.intro}
            >
              Test bed
              {!isOpend ? (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </i>
              ) : (
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </i>
              )}
            </ul>
            {isOpend && (
              <li
                href="#"
                className={selectedMenu === "testbed" ? Styles.active : ""}
                onClick={() => handleMenuClick("testbed")}
              >
                testbed
              </li>
            )}
          </div>
        </div>
        <div className={Styles.content}>
          <h2>
            <a> File</a>
            <span></span>
            <a> List</a>{" "}
          </h2>
          {content}
        </div>
      </div>
      <div className={Styles.footer}>
        <span></span>
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <div>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/linux/64903590d224bc4b21cdceb6">개념</Link>
        </li>
      </ul>
    </div>
  );
};

const IdContent = () => {
  return (
    <>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/linux/64903c71d224bc4b21cdcf26">계정관리 1</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64903fdcd224bc4b21cdcfbf">계정관리 2</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/649046c0d224bc4b21cdd060">계정관리 3</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/649046c0d224bc4b21cdd060">계정관리 4</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64904b65d224bc4b21cdd0e0">계정관리 5</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64904d11d224bc4b21cdd11b">계정관리 6</Link>
        </li>
      </ul>
    </>
  );
};

const IdContenta = () => {
  return (
    <>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/linux/6490468ed224bc4b21cdd048">
            파일 및 디렉터리 관리 1
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64904fa0d224bc4b21cdd159">
            파일 및 디렉터리 관리 2
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/649051dad224bc4b21cdd19d">
            파일 및 디렉터리 관리 3
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64905393d224bc4b21cdd1d7">
            파일 및 디렉터리 관리 4
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64905498d224bc4b21cdd20c">
            파일 및 디렉터리 관리 5
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/649057fcd224bc4b21cdd260">
            파일 및 디렉터리 관리 6
          </Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64905b4ad224bc4b21cdd2b7">
            파일 및 디렉터리 관리 7
          </Link>
        </li>
      </ul>
    </>
  );
};

const IdContentb = () => {
  return (
    <>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/linux/64904b43d224bc4b21cdd0d8">서비스 관리 1</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64904fd7d224bc4b21cdd163">서비스 관리 2</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64905262d224bc4b21cdd1ac">서비스 관리 3</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/64905422d224bc4b21cdd1f9">서비스 관리 4</Link>
        </li>
        <li className={Styles.file}>
          <Link to="/linux/6490554ad224bc4b21cdd223">서비스 관리 5</Link>
        </li>
      </ul>
    </>
  );
};

const IdContentc = () => {
  return (
    <div>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/quizmain">메인 퀴즈</Link>
        </li>
      </ul>
    </div>
  );
};

const TestbedContent = () => {
  return (
    <div>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/testbed">Test bed 설명 및 다운로드</Link>
        </li>
      </ul>
    </div>
  );
};

const SettingsContent = () => {
  return (
    <div>
      <ul className={Styles.filelist}>
        <li className={Styles.file}>
          <Link to="/quizmain">퀴즈 풀기</Link>
        </li>
      </ul>
    </div>
  );
};

export default FileLoader;
