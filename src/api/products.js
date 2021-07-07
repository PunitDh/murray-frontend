import { getToken } from "./auth";

const REACT_APP_URL = process.env.REACT_APP_URL;

export function getProducts() {
    const url = `${REACT_APP_URL}/products`;
    console.log(getToken());
    return fetch(url, { headers: {
         'Accept': 'application/json',
         'Authorization': getToken()
        } })
        .then(resp => {
            if (resp.ok) return resp.json();
            else return Promise.reject("Unable to retrieve data");
            },)
        .catch();
}

export function getProduct(id) {
    
    const url = `${REACT_APP_URL}/products/${id}`;
    return fetch(url, { headers: { 'Accept' : 'application/json' } })
        .then(resp => {
            if (resp.ok) return resp.json();
            else return Promise.reject(`Unable to retrieve data`);
            },)
        .catch();
}

// export function getProducts(token) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (Math.random() > 0) { token ? resolve(products) : resolve([]) }
//             else reject();
//          }, 1500);
//     });
// }