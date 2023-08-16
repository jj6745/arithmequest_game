import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

function Timer({ max, score }) {
  const [counter, setCounter] = useState(max);

  const auth = getAuth(); // Get the auth instance
  const db = getFirestore(); // Get the firestore instance

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      console.log("Game Over! Final score:", score);
      // Send the score to Firebase
      if (auth.currentUser) {
        addDoc(collection(db, "scores"), {
          userId: auth.currentUser.uid,
          score: score,
          timestamp: Date.now(),
        })
          .then(() => {
            console.log("Score sent to Firebase!");
          })
          .catch((error) => {
            console.error("Error sending score to Firebase:", error);
          });
      }
    }
  }, [counter, score, auth, db]);

  return (
    <span>
      {counter}
      {counter === 0 && <p>Game Over! Final score: {score}</p>}
    </span>
  );
}

export default Timer;
