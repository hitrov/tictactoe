import * as api from '../api';

const addRecentGame = (playerIdWon, wonCombination, dt, draw) => ({
    type: 'ADD_RECENT_GAME',
    playerIdWon,
    wonCombination,
    dt,
    draw,
});

export const postMove = action => (dispatch, getState) => {

    const state = getState();
    const { bearerToken } = state;

    dispatch({
        type: 'POST_MOVE_REQUEST',
    });

    api.move(action, bearerToken).then(response => {

        const { player_id_won, draw, won_combination, dt, bearer_token } = response;

        dispatch(setBearerToken(bearer_token));

        delete response.bearer_token;

        dispatch({
            type: 'POST_MOVE_SUCCESS',
            move: response,
        });

        if (player_id_won || draw) {
            dispatch(addRecentGame(player_id_won, won_combination, dt, draw));
        }


    }, error => handleFetchError(error, dispatch, 'POST_MOVE_FAILURE'));
};

export const setPlayer1Name = player1Name => ({
    type: 'SET_PLAYER_1_NAME',
    player1Name,
});

export const setPlayer2Name = player2Name => ({
    type: 'SET_PLAYER_2_NAME',
    player2Name,
});

const setXO = (xId, oId) => ({
    type: 'SET_X_O',
    xId,
    oId,
});

const setBearerToken = bearerToken => ({
    type: 'SET_BEARER_TOKEN',
    bearerToken,
});

export const postCreatePlayers = (player1Name, player2Name) => dispatch => {
    dispatch({
        type: 'POST_CREATE_PLAYERS_REQUEST',
    });

    api.createPlayers(player1Name, player2Name).then(response => {
        const { player_1, player_2, bearer_token } = response;

        dispatch({
            type: 'POST_CREATE_PLAYERS_SUCCESS',
            player1Id: player_1,
            player2Id: player_2,
        });

        dispatch(setXO(player_1, player_2));
        dispatch(setBearerToken(bearer_token));

    }, error => handleFetchError(error, dispatch, 'POST_CREATE_PLAYERS_FAILURE'));
};

export const postGame = () => (dispatch, getState) => {
    const state = getState();
    const { bearerToken } = state;

    dispatch({
        type: 'POST_CREATE_GAME_REQUEST',
    });

    api.createGame(bearerToken).then(response => {

        const { id, player_1, player_2, bearer_token } = response;

        dispatch({
            type: 'POST_CREATE_GAME_SUCCESS',
            gameId: id,
            player1Id: player_1,
            player2Id: player_2,
        });

        dispatch(setBearerToken(bearer_token));

    }, error => handleFetchError(error, dispatch, 'POST_CREATE_GAME_FAILURE'));
};

export const fetchHistory = () => (dispatch, getState) => {
    const state = getState();
    const { bearerToken } = state;

    dispatch({
        type: 'FETCH_HISTORY_REQUEST',
    });

    api.getHistory(bearerToken).then(response => {

        const { bearer_token, history } = response;

        dispatch(setBearerToken(bearer_token));

        dispatch({
            type: 'FETCH_HISTORY_SUCCESS',
            history,
        });

    }, error => handleFetchError(error, dispatch, 'FETCH_HISTORY_FAILURE'));
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

// const handleFetchError = (error, dispatch, method, actionType, payload) => {
const handleFetchError = (error, dispatch, actionType) => {

    // const event = {
    //     method,
    //     ...payload,
    // };

    let message;
    if (error && error.hasOwnProperty('errors')) {
        message = error.errors.join(', ');
    }

    dispatch({
        type: actionType,
        message: message || 'Something went wrong.',
        // event,
    });
};

export const dismissError = () => dispatch =>
    dispatch({
        type: 'DISMISS_ERROR',
    });

export const getGameId = state => state.game ? state.game.game_id : null;