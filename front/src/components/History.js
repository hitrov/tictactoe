import React from 'react';
import HistoryGameItem from './HistoryGameItem';

const History = props => {
    const { history } = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>Game ID</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Moves</th>
                    <th>Finished</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(history).map(gameId =>
                    <HistoryGameItem key={gameId} gameId={gameId} item={history[gameId]} />)}
            </tbody>
        </table>
    );
};

export default History;