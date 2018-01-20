import React from 'react';
import HistoryGameItem from './HistoryGameItem';
import { Table, ProgressBar } from 'react-bootstrap';

const History = props => {
    const { history, isFetching } = props;

    if (isFetching) {
        return <ProgressBar active now={100} />;
    }

    return (
        <Table className="history-table" responsive bordered condensed hover>
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