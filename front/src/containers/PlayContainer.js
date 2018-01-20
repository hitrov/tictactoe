import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import PlayerNames from '../components/PlayerNames';
import History from '../components/History';
import { Row, Col, Button } from 'react-bootstrap';
import { getGameId, postGame, getActivePlayerId } from '../actions';

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
        const { gameId, recents, player1Id, player2Id, player1Name, player2Name, activePlayerId } = this.props;

        let player1ClassName = 'player-name',
            player2ClassName = 'player-name';

        if (activePlayerId === player1Id) {
            player1ClassName += ' active';
        } else {
            player2ClassName += ' active';
        }

        return (
            <div>
                <PlayerNames
                    player1Name={player1Name}
                    player2Name={player2Name}
                    player1ClassName={player1ClassName}
                    player2ClassName={player2ClassName}
                />
                <Row style={{height: '100%'}} className="show-grid">
                    <Col xs={12} lg={7}>
                        {gameId !== null &&
                        <PlayingField />}
                    </Col>

                    {player1Id !== undefined && player2Id !== undefined &&
                    <Button
                        bsStyle="primary"
                        onClick={this.onCreateGameClick}
                    >
                        New Game
                    </Button>}

                    <Col className={'hidden-xs'} lg={5}>
                        <History history={recents} />
                    </Col>
                </Row>
            </div>
        );
    }
}

PlayContainer = connect(state => {
    const { recents, player1Id, player2Id, player1Name, player2Name } = state;

    return {
        gameId: getGameId(state),
        recents,
        player1Id,
        player2Id,
        player1Name,
        player2Name,
        activePlayerId: getActivePlayerId(state),
    };
}, {
    postGame,
})(PlayContainer);

export default PlayContainer;