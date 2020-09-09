import React from 'react';

const PlayerNames = ({ player1Name, player2Name, player1ClassName, player2ClassName }) =>
    <div className="player-names flex space-around">
        <div className={player1ClassName}>
            {player1Name}
        </div>
        <div className={player2ClassName}>
            {player2Name}
        </div>
    </div>;

export default PlayerNames;
