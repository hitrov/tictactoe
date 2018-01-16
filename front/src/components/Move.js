import React from 'react';

const style = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    border: '1px black solid',
    margin: '5px',
};

const Move = props => {
    const { symbol, onMoveClick, gameFinished, isWonMove } = props;

    return (
        <div style={{
            ...style,
            cursor: gameFinished ? 'not-allowed' : 'pointer',
            backgroundColor: isWonMove ? 'green' : 'white'
        }} className={isWonMove ? 'won' : ''} onClick={onMoveClick}>
            {symbol}
        </div>
    );
};

export default Move;