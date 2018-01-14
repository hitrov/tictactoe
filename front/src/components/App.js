import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
      const { postMove, postCreatePlayers, postGame } = this.props;

      let player1NameInput, player2NameInput;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <input ref={node => player1NameInput = node} />
          <input ref={node => player2NameInput = node} />
          <button
              onClick={() => postCreatePlayers(player1NameInput.value, player2NameInput.value)}
          >
              Create Players
          </button>

          <button
            onClick={() => postMove(2, 8)}
          >
              Move
          </button>

          <button
              onClick={() => postGame(1, 2)}
          >
              Create Game
          </button>
      </div>
    );
  }
}

export default App;
