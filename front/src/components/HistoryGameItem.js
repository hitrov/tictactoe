import React from 'react';

const HistoryGameItem = props => {
    const { item, gameId } = props;

    let player1Style, player2Style;
    if (item.player_id_won) {
        player1Style = item.player_id_won === item.player_1.id ? ({color: 'green'}) : ({color: 'red'});
        player2Style = item.player_id_won === item.player_2.id ? ({color: 'green'}) : ({color: 'red'});
    }

    return (
        <tr>
            <td>{gameId}</td>
            <td style={player1Style}>
                {item.player_1.name}
            </td>
            <td style={player2Style}>
                {item.player_2.name}
            </td>
            <td>{Object.keys(item.moves).map(moveId => item.moves[moveId].action)}</td>
            <td>{item.finished || ''}</td>
        </tr>
    );
};

export default HistoryGameItem;