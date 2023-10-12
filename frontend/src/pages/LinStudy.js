import React, { useEffect, useState } from "react";
import Styles from "../styles/LinStudy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";

const FileLoader = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpena, setIsOpena] = useState(false);
  const [isOpenb, setIsOpenb] = useState(false);
  const [isOpenc, setIsOpenc] = useState(false);
  const [isOpend, setIsOpend] = useState(false);
  const [linuxFiles, setLinuxFiles] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const fetchLinuxFiles = () => {
    axios
      .get("http://localhost:4000/linux/files")
      .then((response) => {
        setLinuxFiles(response.data);
        console.log(linuxFiles);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchLinuxFiles();
  }, []);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  useEffect(() => {
    // 데이터 필터 및 정렬 로직
    const serviceManagementFiles = linuxFiles.filter((item) =>
      item.name.includes("계정관리")
    );

    // 숫자로 정렬
    serviceManagementFiles.sort((a, b) => {
      const numberA = parseInt(a.name.replace(/[^0-9]/g, ""), 10);
      const numberB = parseInt(b.name.replace(/[^0-9]/g, ""), 10);
      return numberA - numberB;
    });

    // 데이터 그룹화
    const groups = [];
    for (let i = 0; i < serviceManagementFiles.length; i += 5) {
      groups.push(serviceManagementFiles.slice(i, i + 5));
    }

    setGroupedData(groups);
    console.log(groupedData);
  }, [linuxFiles]);

  return (
    <>
      {groupedData.map((group, groupIndex) => (
        <ul className={Styles.filelist} key={groupIndex}>
          {group.map((item) => (
            <li className={Styles.file} key={item._id}>
              <Link className={Styles.filelink} to={`/linux/user/${item._id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};

export default FileLoader;
