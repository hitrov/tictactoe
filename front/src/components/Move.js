import React from 'react';

const style = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    border: '1px black solid',
};

const Move = props => {
    const { action, onMoveClick } = props;

    return (
        <div style={style} onClick={onMoveClick}>
            {action}
        </div>
    );
};

export default Move;