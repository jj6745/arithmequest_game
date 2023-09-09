import React, { useState } from "react";
import Timer from "./Timer";
import GenerateQuestion from "./Generate";
import Solve from "./Solve";
import "./App.css";
export default function Game() {
  const [nums, setNums] = useState([0, 0, 0]);
  var [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const toggleDifficulty = () => {
    if (difficulty === "easy") {
      setDifficulty("medium");
    } else if (difficulty === "medium") {
      setDifficulty("hard");
    } else {
      setDifficulty("easy");
    }
  };
  
  const generateQuestion = () => {
    let difficultyLevel;
    if (difficulty === "easy") {
      difficultyLevel = 2;
    } else if (difficulty === "medium") {
      difficultyLevel = 3;
    } else if (difficulty === "hard") {
      difficultyLevel = 4;
    }
  
    const newQuestion = GenerateQuestion(difficultyLevel);
    setNums(newQuestion);
    setAnswer("");
  };
  
  const submit = (e) => {
    e.preventDefault();
    var nums_except_last = nums.slice(0, nums.length - 1);
    var s = Solve(nums_except_last, nums[nums.length - 1]);
    console.log(s);
    if (s.has(answer)) {
      setScore((score) => score + 1);
      generateQuestion();
    }
  };

  const startGameHandler = () => {
    generateQuestion();
    setStartGame(true);
    setGameOver(false);
  };

  const handleTimerComplete = () => {
    console.log(`Game Over! Final score: ${score}`);
    setGameOver(true);
  };

  return (
    <div className="center-container container mt-5">
      {startGame && !gameOver && (
        <>
          <Timer max={30}  score={score} onComplete={handleTimerComplete} /> 
          Use all the numbers provided to get to the target number!
          <div className="mb-3">
              <button className="btn btn-primary m-2" type="submit">
                {nums[nums.length - 1]}
              </button>
            </div>
          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                className="form-control"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
              />
            </div>

            <div className="mb-3">
              {nums.slice(0, nums.length - 1).map((num, index) => (
                <button className="btn btn-primary m-1"
                  key={index}
                  onClick={() => setAnswer((prevAnswer) => prevAnswer + num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </form>
          <div className="mb-3">
            <button className="btn btn-secondary m-1"
              onClick={() => setAnswer(answer + "+")}
            >
              +
            </button>
            <button className="btn btn-secondary m-1"
              onClick={() => setAnswer(answer + "-")}
            >
              -
            </button>
            <button className="btn btn-secondary m-1"
              onClick={() => setAnswer(answer + "*")}
            >
              *
            </button>
            <button className="btn btn-secondary m-1"
              onClick={() => setAnswer(answer + "/")}
            >
              /
            </button>
          </div>
          <div className="mb-3">
            <button className="btn btn-warning m-1" onClick={() => setAnswer("")}>
              RESET
            </button>
          </div>
          <button className="btn btn-danger m-1" onClick={generateQuestion}>
            SKIP
          </button>
          <p className="score mt-3">Score: {score}</p>
        </>
      )}
      {!startGame && (
        <button className="btn btn-success m-1" onClick={startGameHandler}>
          Start Game
        </button>
      )}
    <button className="btn btn-info m-1" onClick={toggleDifficulty}>
      Change Difficulty: {difficulty}
    </button>
  </div>
);
      }  