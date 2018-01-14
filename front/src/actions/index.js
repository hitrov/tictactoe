import * as api from '../api';

const move = response => ({
    type: 'MOVE',
    moveId: response.move_id,
});

export const postMove = (gameId, action) => dispatch =>
    api.move(gameId, action).then(response => dispatch(move(response)));

export const setPlayerNames = (player1Name, player2Name) => ({
    type: 'SET_PLAYER_NAMES',
    player1Name,
    player2Name,
});

const createPlayers = response => ({
    type: 'CREATE_PLAYERS',
    player1Id: response.player_1,
    player2Id: response.player_2,
});

export const postCreatePlayers = (player1Name, player2Name) => dispatch =>
    api.createPlayers(player1Name, player2Name).then(response => dispatch(createPlayers(response)));

const game = response => ({
    type: 'GAME',
    gameId: response.game_id,
});

export const postGame = (player1Id, player2Id) => dispatch =>
    api.createGame(player1Id, player2Id).then(response => dispatch(game(response)));