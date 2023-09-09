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

  const generateQuestion = () => {
    const newQuestion = GenerateQuestion(2);//change difficulty here 2 is easy 3 is medium 4 is hard
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
      <button>change difficulty</button>
    </div>
  );
      }  