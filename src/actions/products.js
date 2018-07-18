import productsjson from '../server/products.json';

export function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsSuccess(productsjson));
    };
}
  

/* let axios = require('axios');

const url = "http://digitalpreorder.azurewebsites.net/api/product";
let url2 = "https://api.github.com/search/users?q=language:javascript+location:lagos&sort=repositories&order=desc"
const store = "?store=store1"
const headers = {
    dataType: 'json',
    mode: 'no-cors',
    header: {
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsBegin())
        return axios.get(url, headers).then(
            (response) => {
                console.log(response.data);
            },
            (err) => {
                console.log(err);
            }
        )

    }
}
  */

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});