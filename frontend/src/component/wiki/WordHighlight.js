import React from "react";

const WordHighlight = ({ text, highlightWords }) => {
  const words = text.split(" ");

  return (
    <p>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            backgroundColor: highlightWords.includes(word)
              ? "yellow"
              : "inherit",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default WordHighlight;
