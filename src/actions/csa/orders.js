
let axios = require('axios');
import config from '../server/config.json';

const apiUrl = "http://digitalpreorder.azurewebsites.net/api/product";
const store = `?store=${config[0].store_id}`;
let url = apiUrl + store;

const headers = {
    header: {
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrders())
        return axios.get(url, headers).then(
            (response) => {
                dispatch(fetchOrdersSuccess(response.data));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

export const fetchOrdersBegin = () => ({
  type: 'FETCH_PRODUCTS_BEGIN'
});

export const fetchOrdersSuccess = products => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products }
});

export const fetchOrdersFailure = error => ({
  type: 'FETCH_PRODUCTS_FAILURE',
  payload: { error }
});