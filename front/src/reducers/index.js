const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'MOVE':
            return {
                ...state,
                moves: [...state.moves, action.move],
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
            return {
                ...state,
                gameId: action.gameId,
                moves: [],
            };

        default:
            return state;
    }
};

export default reducer;
