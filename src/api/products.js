import { getToken } from "./auth";

export function getProducts() {
    const url = 'http://localhost:3010/products';
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
    
    const url = `http://localhost:3010/products/${id}`;
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