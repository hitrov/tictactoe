import React from 'react';
import { Col } from 'react-bootstrap';

const style = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    border: '1px black solid',
    margin: '5px',
    fontSize: '54pt',
};

const Move = props => {
    const { symbol, onMoveClick, gameFinished, isWonMove } = props;

    return (
        <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            style={{
            ...style,
            cursor: gameFinished ? 'not-allowed' : 'pointer',
            backgroundColor: isWonMove ? 'green' : 'white'
        }} className={isWonMove ? 'won' : ''} onClick={onMoveClick}>
            {symbol}
        </Col>
    );
};

export default Move;