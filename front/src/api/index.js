import {
    API_BASE_URL,
    API_MOVE_URL,
    API_CREATE_PLAYERS_URL,
    API_GAME_URL,
    API_HISTORY_URL,
} from '../constants';
import { logout } from "../actions";

const callApi = (url, method, body, bearerToken = null) => {
    url = API_BASE_URL+url;

    const headers = {};
    if (bearerToken) {
        headers['Authorization'] = 'Bearer '+bearerToken;
    }

    if (body) {
        const form = new FormData();
        Object.keys(body).forEach((val) => {
            form.append(val, body[val])
        });
        body = form;
    }

    return fetch(url, {
        method: method,
        headers,
        body: body,
        // credentials: 'include',
    }).then(response => response.json()
        .then(json => {
            if (!response.ok) {
                // handling token expired
                if (response.status === 401) {
                    setTimeout(logout, 1000)
                }

                return Promise.reject(json);
            }
            return json;
        }));
};

export const move = (action, bearerToken) =>
    callApi(API_MOVE_URL, "POST", {
        action,
    }, bearerToken);

export const createPlayers = (player1Name, player2Name) =>
    callApi(API_CREATE_PLAYERS_URL, "POST", {
        'player_1': player1Name,
        'player_2': player2Name,
    });

export const createGame = bearerToken =>
    callApi(API_GAME_URL, "POST", {
    }, bearerToken);

export const getHistory = bearerToken =>
    callApi(API_HISTORY_URL, "GET", null, bearerToken);