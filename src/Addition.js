import React, { useState } from "react";
import "./App.css";
import Timer from "./Timer"; // Import the Timer component

export default function Addition() {
  const [num1, setNum1] = useState(Math.ceil(Math.random() * 10));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [incorrect, updateIncorrect] = useState(false);

  function handleChange(event) {
    setUserInput(event.target.value);
  }

  function handleSubmit(event) {
    if (event.key === "Enter") {
      const answer = parseInt(userInput, 10);
      if (answer === num1 + num2) {
        setScore(score + 1);
        setUserInput("");
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
        updateIncorrect(false);
      } else {
        setUserInput("");
        updateIncorrect(true);
      }
    }
  }

  return (
    <div className="App">
      <h1> Addition Game </h1>
      <div className={incorrect ? "colorchange" : ""}>
        {num1} + {num2}
      </div>
      <input
        onKeyPress={handleSubmit}
        onChange={handleChange}
        value={userInput}
      />
      <div>Current Score : {score}</div>
      <div>userType : {userInput}</div>
      {/* Include the Timer component */}
      <Timer max={10} score={score} />
    </div>
  );
}
