import React, { Component } from 'react';
import PlayingField from './PlayingField';
import { Link } from 'react-router-dom';
import History from './History';

class App extends Component {
    render() {
        const { postGame, player1Id, player2Id, gameId, recents,
        onCreateGameClick, onPlayer1NameChange, onPlayer2NameChange, player1Name, player2Name } = this.props;

        return (
            <div>
                <Link to="/history">History</Link>

                <input onChange={ onPlayer1NameChange } value={player1Name} />
                <input onChange={ onPlayer2NameChange } value={player2Name} />

                <button
                onClick={onCreateGameClick}
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
