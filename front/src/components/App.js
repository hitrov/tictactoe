import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import PlayingField from './PlayingField';
import { Link } from 'react-router-dom';
import History from './History';

class App extends Component {
  render() {
      const { setPlayerNames, postCreatePlayers, postGame,
          player1Id, player2Id, gameId, recents } = this.props;

      let player1NameInput, player2NameInput;

    return (
      <div className="App">
          <Link to="/history">History</Link>
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
              onClick={() => {
                  const player1Name = player1NameInput.value;
                  const player2Name = player2NameInput.value;

                  setPlayerNames(player1Name, player2Name);
                  postCreatePlayers(player1Name, player2Name)
              }}
          >
              Create Players
          </button>

          {player1Id !== undefined && player2Id !== undefined &&
          <button
              onClick={() => postGame(player1Id, player2Id)}
          >
              Create Game
          </button>}

          {gameId !== null &&
          <PlayingField />}

          <History isRecents={true} history={recents} />
      </div>
    );
  }
}

export default App;
