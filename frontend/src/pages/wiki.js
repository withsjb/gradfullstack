import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../styles/wiki.module.css";

const App = () => {
  const [wikiEntries, setWikiEntries] = useState([]);
  const [terms, setTerms] = useState([]);
  const [newEntryName, setNewEntryName] = useState("");
  const [newEntryText, setNewEntryText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    // 1번 모델의 데이터 가져오기
    axios
      .get("http://localhost:4000/wikiapp")
      .then((response) => {
        setWikiEntries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // 2번 모델의 데이터 가져오기
    axios
      .get("http://localhost:4000/terms")
      .then((response) => {
        setTerms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const findMatchingTerm = (word) => {
    const matchingTerm = terms.find(
      (term) => term.term.toLowerCase() === word.toLowerCase()
    );
    return matchingTerm;
  };

  const showDefinition = (term) => {
    setModalContent(term.definition);
    setShowModal(true);
  };

  const hideDefinition = () => {
    setShowModal(false);
  };

  const handleNewEntrySubmit = (event) => {
    event.preventDefault();

    // 새로운 엔트리 데이터 생성
    const newEntry = {
      Name: newEntryName,
      Text: newEntryText,
    };

    // 1번 모델에 데이터 추가
    axios
      .post("http://localhost:4000/wikiapp", newEntry)
      .then((response) => {
        console.log(response.data);
        // 데이터 추가 후 엔트리 목록 다시 가져오기
        axios
          .get("http://localhost:4000/wikiapp")
          .then((response) => {
            setWikiEntries(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // 입력 필드 초기화
    setNewEntryName("");
    setNewEntryText("");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleNewEntrySubmit}>
          <input
            type="text"
            placeholder="이름"
            value={newEntryName}
            onChange={(event) => setNewEntryName(event.target.value)}
          />
          <textarea
            className={Styles.wikitext}
            placeholder="텍스트"
            value={newEntryText}
            onChange={(event) => setNewEntryText(event.target.value)}
          />
          <button type="submit">추가</button>
        </form>
      </div>
      {wikiEntries.map((entry) => (
        <div key={entry._id}>
          <h3>{entry.Name}</h3>
          <p>
            {entry.Text.split(" ").map((phrase) => {
              const words = phrase.split(/\b/);
              return words.map((word, index) => {
                const term = findMatchingTerm(word);
                if (term) {
                  return (
                    <span
                      key={word + index}
                      style={{ color: "blue" }}
                      onMouseOver={() => showDefinition(term)}
                      onMouseOut={hideDefinition}
                    >
                      {word}{" "}
                    </span>
                  );
                }
                return <span key={word + index}>{word} </span>;
              });
            })}
          </p>
        </div>
      ))}

      {showModal && (
        <div className={Styles.wikimodel}>
          <div className="modal-content">{modalContent}</div>
        </div>
      )}
    </div>
  );
};

export default App;
