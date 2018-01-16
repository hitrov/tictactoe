import * as api from '../api';

const move = move => ({
    type: 'MOVE',
    move: move,
});

const addRecentGame = (playerIdWon, dt) => ({
    type: 'ADD_RECENT_GAME',
    playerIdWon,
    dt,
});

export const postMove = (gameId, action) => dispatch =>
    api.move(gameId, action).then(m => {

        if (m.player_id_won) {
            dispatch(addRecentGame(m.player_id_won, m.dt));
        }

        dispatch(move(m));
    });

export const setPlayerNames = (player1Name, player2Name) => ({
    type: 'SET_PLAYER_NAMES',
    player1Name,
    player2Name,
});

const setXO = response => ({
    type: 'SET_X_O',
    xId: response.player_1,
    oId: response.player_2,
});

const createPlayers = response => ({
    type: 'CREATE_PLAYERS',
    player1Id: response.player_1,
    player2Id: response.player_2,
});

export const postCreatePlayers = (player1Name, player2Name) => dispatch => {
    api.createPlayers(player1Name, player2Name).then(response => {
        dispatch(createPlayers(response));
        dispatch(setXO(response));
    });
};

const game = response => ({
    type: 'GAME',
    gameId: response.id,
    player1Id: response.player_1,
    player2Id: response.player_2,
});

export const postGame = (player1Id, player2Id) => dispatch =>
    api.createGame(player1Id, player2Id).then(response => dispatch(game(response)));

const setHistory = response => ({
    type: 'SET_HISTORY',
    response,
});

export const fetchHistory = () => dispatch => {
    api.getHistory().then(response => dispatch(setHistory(response)));
};

export const getIsWonMove = (game, action) => {
    let isWonMove = false;
    if (!game) {
        return isWonMove;
    }

    const move = game.moves.find(move => parseInt(move.action, 10) === action);
    if (!move) {
        return isWonMove;
    }

    const winnerMoves = game.moves
        .filter(move => move.player_id === game.player_id_won)
        .map(move => parseInt(move.action, 10));

    isWonMove = winnerMoves.indexOf(action) !== -1;

    return isWonMove;
};

export const getSymbol = (game, action, xId) => {
    let symbol = '';
    if (!game) {
        return symbol;
    }

    const move = game.moves.find(move => parseInt(move.action, 10) === action);
    if (!move) {
        return symbol;
    }

    const movePlayerId = parseInt(move.player_id, 10);
    symbol = movePlayerId === xId
        ? 'X'
        : 'O';

    return symbol;
};