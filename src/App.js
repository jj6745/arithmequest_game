import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Home from './Home';
import Login from './Login';
import Addition from './Addition';
import Board from './LeaderBoard';
import Game from './Game'; // Import the Game component

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      showAddition: false,
      showLeaderBoard: false,
      showGame: false, // Add this state
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  // Toggle the addition game visibility
  toggleAddition = () => {
    this.setState({ showAddition: !this.state.showAddition, showLeaderBoard: false });
  };

  // Toggle the leaderboard visibility
  toggleLeaderBoard = () => {
    this.setState({ showLeaderBoard: !this.state.showLeaderBoard, showAddition: false });
  };

  toggleGame = () => {
    this.setState({ showGame: !this.state.showGame, showAddition: false, showLeaderBoard: false });
  };
  
  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <>
            <button onClick={this.toggleAddition}>Start Game</button>
            <button onClick={this.toggleLeaderBoard}>Leaderboard</button>
            <button onClick={this.toggleGame}>Start2</button> {/* Add this button */}
            {this.state.showAddition && <Addition />}
            {this.state.showLeaderBoard && <Board />}
            {this.state.showGame && <Game />} {/* Add this */}
            <Home />
          </>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
