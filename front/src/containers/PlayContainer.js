import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayingField from '../components/PlayingField';
import History from '../components/History';
import { Row, Col } from 'react-bootstrap';
import { getGameId } from '../actions';

class PlayContainer extends Component {
    render(){
        const { gameId, recents } = this.props;

        return (
            <Row style={{height: '100%'}} className="show-grid">
                <Col xs={12} lg={7}>
                    {gameId !== null &&
                    <PlayingField />}
                </Col>

                <Col className={'hidden-xs'} lg={5}>
                    <History history={recents} />
                </Col>
            </Row>
        );
    }
}

PlayContainer = connect(state => ({
    gameId: getGameId(state),
    recents: state.recents,
}))(PlayContainer);

export default PlayContainer;