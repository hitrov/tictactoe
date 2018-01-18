import { MAX_RECENTS } from '../constants';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'POST_MOVE_SUCCESS':
            return {
                ...state,
                game: {
                    ...state.game,
                    moves: [...state.game.moves, action.move],
                },
                isFetching: false,
            };

        case 'SET_PLAYER_NAMES':
            return {
                ...state,
                player1Name: action.player1Name,
                player2Name: action.player2Name,
            };

        case 'POST_CREATE_PLAYERS_SUCCESS':
            return {
                ...state,
                player1Id: action.player1Id,
                player2Id: action.player2Id,
                isFetching: false,
            };

        case 'SET_X_O':
            return {
                ...state,
                xId: action.xId,
                oId: action.oId,
            };

        case 'POST_CREATE_GAME_SUCCESS':
            const { player1Name, player2Name } = state;
            const { gameId, player1Id, player2Id } = action;

            return {
                ...state,
                game: {
                    game_id: gameId,
                    player_1: {
                        id: player1Id,
                        name: player1Name,
                    },
                    player_2: {
                        id: player2Id,
                        name: player2Name,
                    },
                    moves: [],
                },
                isFetching: false,
            };

        case 'FETCH_HISTORY_SUCCESS':
            return {
                ...state,
                history: action.history,
                isFetching: false,
            };

        case 'ADD_RECENT_GAME':
            const game = {
                ...state.game,
                player_id_won: action.playerIdWon,
                won_combination: action.wonCombination,
                finished: action.dt,
                draw: action.draw,
            };

            const recents = [...state.recents];
            if (recents.length === MAX_RECENTS) {
                recents.splice(-1, 1)
            }

            return {
                ...state,
                game,
                recents: [game, ...recents],
            };

        case 'SET_BEARER_TOKEN':
            return {
                ...state,
                bearerToken: action.bearerToken,
            };

        case 'POST_MOVE_REQUEST':
        case 'POST_CREATE_PLAYERS_REQUEST':
        case 'POST_CREATE_GAME_REQUEST':
        case 'FETCH_HISTORY_REQUEST':
            return {
                ...state,
                isFetching: true,
            };

        case 'POST_MOVE_FAILURE':
        case 'POST_CREATE_PLAYERS_FAILURE':
        case 'POST_CREATE_GAME_FAILURE':
        case 'FETCH_HISTORY_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message,
            };

        case 'DISMISS_ERROR':
            return {
                ...state,
                errorMessage: '',
            };

        default:
            return state;
    }
};

export default reducer;
