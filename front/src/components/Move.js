import React from 'react';
import { Col } from 'react-bootstrap';

const style = {
    height: '111px',
    border: '1px black solid',
    fontSize: '86pt',
    lineHeight: '86pt',
    textAlign: 'center',
};

const Move = props => {
    const { symbol, onMoveClick, gameFinished, isWonMove, isMoveDone } = props;

    return (
        <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            style={{
            ...style,
            cursor: gameFinished || isMoveDone ? 'not-allowed' : 'pointer',
            backgroundColor: isWonMove ? 'green' : 'white'
        }} className={isWonMove ? 'won' : ''} onClick={onMoveClick}>
            {symbol}
        </Col>
    );
};

export default Move;