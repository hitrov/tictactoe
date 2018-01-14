import {
    API_BASE_URL,
    API_MOVE_URL,
} from '../constants';

const callApi = (url, method, body, headers) => {
    url = API_BASE_URL+url;

    let requiredHeaders = {};
    if (body) {
        var form = new FormData();
        Object.keys(body).forEach((val) => {
            form.append(val, body[val])
        });
        body = form;
    }

    if (headers) {
        requiredHeaders = Object.assign({}, headers, requiredHeaders);
    }

    return fetch(url, {
        method: method,
        headers: requiredHeaders,
        body: body,
        credentials: 'include',
    })
        .then(response => {
            // debugger;
            return response.json();
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
};

export const move = (gameId, action) =>
    callApi(API_MOVE_URL, "POST", {
        'game_id': gameId,
        action,
    });
