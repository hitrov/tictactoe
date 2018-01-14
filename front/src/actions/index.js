import * as api from '../api';

export const move = () => ({
    type: 'MOVE',
});

export const postMove = (gameId, action) => dispatch =>
    api.move(gameId, action).then(m => dispatch(move(m)));
