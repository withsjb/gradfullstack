import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../styles/Filedetail.module.css";

const FileDetail = () => {
  const [file, setFile] = useState(null);
  const [concept, setConcept] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const { fileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFile();
    fetchTerms();
    fetchPhotos();
  }, []);

  const fetchFile = () => {
    axios
      .get(`http://localhost:4000/linux/files/${fileId}`)
      .then((response) => {
        const fetchedFile = response.data;
        if (fetchedFile.concept === null) {
          fetchedFile.concept = []; // 빈 배열로 초기화
        }
        setFile(fetchedFile);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTerms = () => {
    axios
      .get("http://localhost:4000/terms")
      .then((response) => {
        setTerms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPhotos = () => {
    axios
      .get(`http://localhost:4000/linux/files/${fileId}/addphoto`)
      .then((response) => {
        const photoURLs = response.data.photos.map((photo) => {
          if (photo) {
            return `http://localhost:4000/uploads/${photo}`;
          } else {
            return ""; // 빈 문자열로 처리
          }
        });
        setPhotos(photoURLs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddContentAndPhoto = () => {
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }

    formData.append("concept", concept || ""); // 빈 문자열이면 빈 값으로 추가

    if (content.trim() === "") {
      formData.append("content", ""); // 컨텐츠가 비어 있는 경우도 빈 값으로 추가
    } else {
      formData.append("content", content);
    }

    addContentAndPhoto(formData);
  };

  const addContentAndPhoto = (formData) => {
    axios
      .post(`http://localhost:4000/linux/files/${fileId}/addcontent`, formData)
      .then((response) => {
        console.log(response.data);
        setFile(response.data); // 파일 객체 업데이트
        setConcept(""); // 컨셉 초기화
        setContent(""); // 컨텐츠 초기화
        setPhoto(""); // 사진 초기화
        fetchPhotos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const findMatchingTerm = (word) => {
    const matchingTerm = terms.find(
      (term) => term.term.toLowerCase() === word.toLowerCase()
    );
    return matchingTerm;
  };

  const showDefinition = (term, e) => {
    setModalContent(term.definition);
    const { clientX, clientY } = e;
    setModalPosition({ top: clientY + 10, left: clientX });
    setShowModal(true);
  };

  const hideDefinition = () => {
    setShowModal(false);
  };

  const handleNewEntrySubmit = (event) => {
    event.preventDefault();
    const contentWithHighlight = content.replace(
      new RegExp(`(${terms.map((term) => term.term).join("|")})`, "gi"),
      "<span style='color: blue'>$&</span>"
    );
    setContent(contentWithHighlight);
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  const sortedEntries = file.concept.map((conceptItem, index) => ({
    concept: conceptItem,
    content: file.content[index],
    photo: photos[index] || "", // 이미지가 없을 경우에는 빈 문자열로 설정
  }));

  return (
    <div className={Styles.filebody}>
      <h2>{file.name}</h2>
      <input
        type="text"
        placeholder="컨셉 입력"
        value={concept}
        onChange={(event) => setConcept(event.target.value)}
      />
      <textarea
        className={Styles.contentbox}
        placeholder="컨텐츠 입력"
        value={content}
        onChange={(event) => {
          const value = event.target.value;
          const formattedValue = value.replace(/\r?\n/g, "\n"); // 줄 바꿈 문자를 유지하도록 수정
          setContent(formattedValue);
        }}
      />

      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileSelect}
      />

      <button onClick={handleAddContentAndPhoto}>컨텐츠 및 사진 추가</button>

      <div className={Styles.filecard}>
        {sortedEntries.map((entry, index) => (
          <div key={index} className={Styles.contentItem}>
            <div className={Styles.fileconceptdiv}>{entry.concept}</div>
            <div className={Styles.filediv}>
              {entry.content.split("<br/>").map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  dangerouslySetInnerHTML={{
                    __html: line.replace(
                      new RegExp(
                        `(${terms.map((term) => term.term).join("|")})`,
                        "gi"
                      ),
                      "<span style='color: blue'>$&</span>"
                    ),
                  }}
                />
              ))}
            </div>
            <div className={Styles.photobox}>
              {entry.photo !== "null" && entry.photo ? (
                <div className={Styles.photoItem}>
                  <img
                    className={Styles.photos}
                    src={entry.photo}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ) : (
                <div className={Styles.photoItem} style={{ display: "none" }} />
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div
          className={Styles.filemodal}
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          {modalContent}
        </div>
      )}
    </div>
  );
};

export default FileDetail;
