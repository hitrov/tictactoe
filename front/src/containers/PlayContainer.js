import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import History from '../components/History';
import { Row, Col, Button } from 'react-bootstrap';
import { getGameId, postGame } from '../actions';

class PlayContainer extends Component {
    constructor(props) {
        super(props);
        this.onCreateGameClick = this.onCreateGameClick.bind(this);
    }

    onCreateGameClick() {
        const { history, postGame } = this.props;
        postGame();
        history.push('/play');
    }

    render(){
        const { gameId, recents, player1Id, player2Id, onCreateGameClick } = this.props;

        return (
            <Row style={{height: '100%'}} className="show-grid">
                <Col xs={12} lg={7}>
                    {gameId !== null &&
                    <PlayingField />}
                </Col>

                {player1Id !== undefined && player2Id !== undefined &&
                <Button
                    bsStyle="primary"
                    onClick={onCreateGameClick}
                >
                    Create Game
                </Button>}

                <Col className={'hidden-xs'} lg={5}>
                    <History history={recents} />
                </Col>
            </Row>
        );
    }
}

PlayContainer = connect(state => {
    const { recents, player1Id, player2Id } = state;

    return {
        gameId: getGameId(state),
        recents,
        player1Id,
        player2Id,
    };
}, {
    postGame,
})(PlayContainer);

export default PlayContainer;