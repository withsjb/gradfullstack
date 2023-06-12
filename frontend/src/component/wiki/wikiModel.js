import React from "react";

const Modal = ({ word, description, closeModal }) => {
  return (
    <div>
      <h2>{word}</h2>
      <p>{description}</p>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};

export default Modal;
