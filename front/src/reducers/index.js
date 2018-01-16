const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'MOVE':
            return {
                ...state,
                game: {
                    ...state.game,
                    moves: [...state.game.moves, action.move],
                },
            };

        case 'SET_PLAYER_NAMES':
            return {
                ...state,
                player1Name: action.player1Name,
                player2Name: action.player2Name,
            };

        case 'CREATE_PLAYERS':
            return {
                ...state,
                player1Id: action.player1Id,
                player2Id: action.player2Id,
            };

        case 'SET_X_O':
            return {
                ...state,
                xId: action.xId,
                oId: action.oId,
            };

        case 'GAME':
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
            };

        case 'SET_HISTORY':
            return {
                ...state,
                history: action.response,
            };

        case 'ADD_RECENT_GAME':
            const game = {
                ...state.game,
                player_id_won: action.playerIdWon,
                finished: action.dt,
            };

            return {
                ...state,
                game,
                recents: [...state.recents, game],
            };

        default:
            return state;
    }
};

export default reducer;
