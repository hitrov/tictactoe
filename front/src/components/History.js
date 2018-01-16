import React from 'react';
import HistoryGameItem from './HistoryGameItem';

const History = props => {
    const { history, isRecents } = props;

    if (!history || !history.length) {
        if (isRecents) {
            return null;
        }
        return <h1>Loading...</h1>;
    }

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
            {history.map(item =>
                <HistoryGameItem key={item.game_id} item={item} />)}
            </tbody>
        </table>
    );
};

export default History;