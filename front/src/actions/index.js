import * as api from '../api';

const move = response => ({
    type: 'MOVE',
});

export const postMove = (gameId, action) => dispatch =>
    api.move(gameId, action).then(response => dispatch(move(response)));

const createPlayers = response => ({
    type: 'CREATE_PLAYERS',
});

export const postCreatePlayers = (player1Name, player2Name) => dispatch =>
    api.createPlayers(player1Name, player2Name).then(response => dispatch(createPlayers(response)));