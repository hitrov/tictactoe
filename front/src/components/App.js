import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
      const { postMove, setPlayerNames, postCreatePlayers, postGame,
          player1Id, player2Id, gameId } = this.props;

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
              onClick={() => {
                  const player1Name = player1NameInput.value;
                  const player2Name = player2NameInput.value;

                  setPlayerNames(player1Name, player2Name);
                  postCreatePlayers(player1Name, player2Name)
              }}
          >
              Create Players
          </button>

          {gameId !== undefined &&
          <button
              onClick={() => postMove(gameId, 8)}
          >
              Move
          </button>}

          {player1Id !== undefined && player2Id !== undefined &&
          <button
              onClick={() => postGame(player1Id, player2Id)}
          >
              Create Game
          </button>}
      </div>
    );
  }
}

export default App;
