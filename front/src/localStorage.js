import { LOCAL_STORAGE_STATE } from './constants';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_STATE, serializedState);
    } catch (e) {
        console.log(e);
    }
};
