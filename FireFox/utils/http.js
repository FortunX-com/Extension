const API_URL = 'https://vael.co/api/v1';

let http_counter = 0;

function httpRequest (url, init, successCallback, failCallback) {
    http_counter += 1;

    document.addEventListener(http_counter + '_responseHttp', function (e) {
        const response = e.detail ? JSON.parse(e.detail) : undefined;
        successCallback(response);
    });

    document.addEventListener(http_counter + '_errorHttp', function (e) {
        var response = e.detail;
        if (failCallback) {
            failCallback(response);
        }
    });

    document.dispatchEvent(new CustomEvent('requestHttp', {detail: {'url': url, 'init': JSON.stringify(init), 'counter': http_counter}}));
}

function authHttpRequest(path, params, callBack) {

    // Check if user token data has stored in chrome storage and use it, otherwise get it from api
    getFromStorage('userTokenData', function (userTokenDataResult) {
        if (userTokenDataResult) { // If user token data has exists in chrome storage
            if (userTokenDataResult.expires_in > Math.floor(Date.now() / 1000)) { // If user token has not expired yet
                const headersOfReq = {
                    'Authorization': userTokenDataResult.token_type + ' ' + userTokenDataResult.access_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };

                let init;
                if (params) init = { method: 'GET', headers: headersOfReq, body: JSON.stringify(params) };
                else init = { method: 'GET', headers: headersOfReq };

                httpRequest(API_URL + path, init, function (result) {
                    callBack(result);
                });
            } else { // If user token has expired already
                httpRequest(API_URL + '/token', {
                    method: 'POST',
                    headers: {
                        'Authorization': userTokenDataResult.token_type + ' ' + userTokenDataResult.access_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        grant_type: 'refresh_token',
                        refresh_token: userTokenDataResult.refresh_token,
                        client_id: 'user_login',
                    })
                }, function (newUserTokenDataResult) {
                    saveInStorage('userTokenData', newUserTokenDataResult);

                    const headersOfNewReq = {
                        'Authorization': newUserTokenDataResult.token_type + ' ' + newUserTokenDataResult.access_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };

                    let init;
                    if (params) init = { method: 'GET', headers: headersOfNewReq, body: JSON.stringify(params) };
                    else init = { method: 'GET', headers: headersOfNewReq };

                    httpRequest(API_URL + path, init, function (result) {
                        callBack(result);
                    });
                })
            }
        } else {
            // Tell user to login
            // If user token data has not exists in chrome storage
            // But, this condition never occur if the user has already logged in
            callBack({
                error: 1,
                error_message: 'login needed'
            });
        }
    });
}

function httpGet(path, params, needAuth, callBack) {

    // Detect if the request need authentication
    if (needAuth) {
        authHttpRequest(path, params, function (result) {
            callBack(result);
        });
    } else {
        const headersOfReq = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let init;
        if (params) init = { method: 'GET', headers: headersOfReq, body: JSON.stringify(params) };
        else init = { method: 'GET', headers: headersOfReq };

        httpRequest(API_URL + path, init, function (result) {
            callBack(result);
        });
    }
}

function httpPost(path, params, callBack) {
    const headersOfReq = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let init;
    if (params) init = { method: 'POST', headers: headersOfReq, body: JSON.stringify(params) };
    else init = { method: 'POST', headers: headersOfReq };

    httpRequest(API_URL + path, init, function (result) {
        callBack(result);
    });
}

function httpPut() {

}

function httpDelete() {

}

function httpLogin(path, params, callBack) {
    httpRequest(API_URL + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'password',
            username: params.username,
            password: params.password,
            client_id: 'user_login'
        })
    }, function (result) {
        callBack(result);
    });
}

function httpLogout() {

}
