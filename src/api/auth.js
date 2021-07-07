const TOKEN_KEY = 'session_token';

export const API_URL = process.env.REACT_APP_API_URL;

export function signIn(email, password) {
    const url = `http://localhost:3010/users/sign_in`;
    
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({user: {email,password}})
    }).then(response => {
        if (response.ok) {
            const token = response.headers.get('Authorization');
            if (token != null) {
                console.log("Logged in")
                return setToken(token);
            }
            
            else {
                console.log("Not able to log in")
            }
        } else {
            const { status, statusText } = response;
            return Promise.reject({ status, statusText });
        }
    })
    // return Promise.resolve(setToken('666'));
}

export function signUp(email, password) {
    const url = `http://localhost:3010/users/`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({user: {email, password}})
    }).then(response => {
        if (response.ok) {
            const token = response.headers.get("Authorization");
            return setToken(token);
        } else {
            const { status, statusText } = response;
            return Promise.reject({ status, statusText });
        }
    })
}

export function signOut() {
    const url = `http://localhost:3010/users/sign_out`;
    
    return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
    }).then(response => {
        if (response.ok) {
            return removeToken(); // JavaScript will return a promise either way
        } else {
            const { status, statusText } = response;
            return Promise.reject({ status, statusText });
        }
    })

    // console.log("Logged out");
    // return Promise.resolve(removeToken());
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    return token;
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    return true;
}