import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export default function LeaderBoard() {
  const [period, setPeriod] = useState(0);
  const [scores, setScores] = useState([]);

  const db = getFirestore(); // Get the firestore instance

  const handleClick = (e) => {
    setPeriod(parseInt(e.target.dataset.id));
  }

  useEffect(() => {
    const fetchData = async () => {
      const scoresCollection = collection(db, 'scores');
      
      let scoresQuery = scoresCollection;
      if (period !== 0) {
        const currentDate = new Date();
        const previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - period);
        scoresQuery = query(scoresCollection, where('timestamp', '>', previousDate), where('timestamp', '<=', currentDate));
      }

      const scoresSnapshot = await getDocs(query(scoresQuery, orderBy('score', 'desc')));

      const scoresData = [];
      scoresSnapshot.forEach((doc) => {
        scoresData.push(doc.data());
      });

      setScores(scoresData);
    };

    fetchData();
  }, [db, period]);

  return (
    <div className="board">
      <h1 className="leaderboard">Leaderboard</h1>

      <div className="duration">
        <button onClick={handleClick} data-id="7">7 Days</button>
        <button onClick={handleClick} data-id="30">30 Days</button>
        <button onClick={handleClick} data-id="0">All-Time</button>
      </div>

      <ul className="scores-list">
        {scores.map((score, index) => (
          <li key={index}>
            {score.userId}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
