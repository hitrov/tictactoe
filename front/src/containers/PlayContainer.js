import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import PlayerNames from '../components/PlayerNames';
import History from '../components/History';
import { Col, Button, Clearfix } from 'react-bootstrap';
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
            gameFinished
        } = this.props;

        let player1ClassName = 'player-name',
            player2ClassName = 'player-name';

        if (!gameFinished) {
            if (activePlayerId === player1Id) {
                player1ClassName += ' active';
            } else {
                player2ClassName += ' active';
            }
        }

        return (
            <React.Fragment>
                <PlayerNames
                    player1Name={player1Name}
                    player2Name={player2Name}
                    player1ClassName={player1ClassName}
                    player2ClassName={player2ClassName}
                />
                <React.Fragment>
                    <Col xs={12} lg={7}>
                        {gameId !== null &&
                        <PlayingField />}
                    </Col>

                    <Col xs={12} lg={5}>
                        {(player1Id && player2Id) &&
                        <Button
                            className="game__new-game-btn"
                            onClick={this.onCreateGameClick}
                        >
                            New Game
                        </Button>}

                        <Col className={'game__recent-table hidden-xs'} >
                            <History history={recents} />
                        </Col>
                    </Col>
                </React.Fragment>
            </React.Fragment>
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
    };
}, {
    postGame,
})(PlayContainer);

export default PlayContainer;