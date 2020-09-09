import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import PlayerNames from '../components/PlayerNames';
import History from '../components/History';
import {Button} from 'react-bootstrap';
import { getGameId, postGame, getActivePlayerId, getGameFinished } from '../actions';

class PlayContainer extends Component {
    constructor(props) {
        super(props);
        this.onCreateGameClick = this.onCreateGameClick.bind(this);
    }

    onCreateGameClick() {
        const { postGame } = this.props;
        postGame();
    }

    render(){
        const {
            gameId,
            recents,
            player1Id,
            player2Id,
            player1Name,
            player2Name,
            activePlayerId,
            gameFinished,
            isNewGameButtonDisabled,
        } = this.props;

        let player1ClassName = 'player-name',
            player2ClassName = 'player-name';

        if (gameId && !gameFinished) {
            if (activePlayerId === player1Id) {
                player1ClassName += ' active';
            } else {
                player2ClassName += ' active';
            }
        }

        return (
            <div>
                <div>
                    <PlayerNames
                        player1Name={player1Name}
                        player2Name={player2Name}
                        player1ClassName={player1ClassName}
                        player2ClassName={player2ClassName}
                    />
                </div>
                <div>
                    <div>
                        {gameId &&
                        <PlayingField />}
                    </div>

                    <div>
                        {(player1Id && player2Id) &&
                        <Button
                            className="game__new-game-btn flex"
                            onClick={this.onCreateGameClick}
                            disabled={isNewGameButtonDisabled}
                        >
                            New Game
                        </Button>}

                        <div className={'game__recent-table'} >
                            <History history={recents} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PlayContainer = connect(state => {
    const { recents, player1Id, player2Id, player1Name, player2Name } = state;

    const gameFinished = getGameFinished(state);

    return {
        gameId: getGameId(state),
        recents,
        player1Id,
        player2Id,
        player1Name,
        player2Name,
        activePlayerId: getActivePlayerId(state),
        gameFinished,
        isNewGameButtonDisabled: state.game && state.game.moves && state.game.moves.length === 0,
    };
}, {
    postGame,
})(PlayContainer);

export default PlayContainer;
