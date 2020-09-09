import React from 'react';

const style = {
    width: '111px',
    height: '111px',
    border: '1px black solid',
    fontSize: '78pt',
    lineHeight: '83pt',
    textAlign: 'center',
    padding: 0,
};

const Move = props => {
    const { symbol, onMoveClick, gameFinished, isWonMove, isMoveDone, isDraw, isFetching } = props;

    let backgroundColor = 'white';
    if (isDraw) {
        backgroundColor = 'grey';
    }
    if (isWonMove) {
        backgroundColor = '#1db954';
    }

    let cursor = 'pointer';
    if (gameFinished || isMoveDone || isDraw || isFetching) {
        cursor = 'not-allowed';
    }

    return (
        <div
            style={{
            ...style,
            cursor,
            backgroundColor,
        }} className={isWonMove ? 'won' : ''} onClick={onMoveClick}>
            {symbol}
        </div>
    );
};

export default Move;
