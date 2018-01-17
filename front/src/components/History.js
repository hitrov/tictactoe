import React from 'react';
import HistoryGameItem from './HistoryGameItem';
import { Table } from 'react-bootstrap';

const History = props => {
    const { history, isRecents } = props;

    if (!history) {
        if (isRecents) {
            return null;
        }
        return <h1>Loading...</h1>;
    }

    return (
        <Table responsive striped bordered condensed hover>
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
        </Table>
    );
};

export default History;