import React, { Component } from 'react';
import './App.css';
import Board from './LeaderBoard';
import Game from './Game'; // Import the Game component

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      showLeaderBoard: false,
      showGame: true, // Add this state
    };
  }

  // Toggle the leaderboard visibility
  toggleLeaderBoard = () => {
    this.setState({ showLeaderBoard: !this.state.showLeaderBoard, showGame: false });
  };

  toggleGame = () => {
    this.setState({ showGame: !this.state.showGame, showLeaderBoard: false });
  };
  
  render() {
    return (
      <div className="App">
        {this.state.showGame && <Game />} {/* Add this */}
      </div>
    );
  }
}

export default App;
