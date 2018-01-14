import React from 'react';

const style = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    border: '1px black solid',
    margin: '5px',
};

const Move = props => {
    const { symbol, onMoveClick } = props;

    return (
        <div style={style} onClick={onMoveClick}>
            {symbol}
        </div>
    );
};

export default Move;