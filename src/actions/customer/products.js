import { baseUrl, headers } from "../../const/global";

import axios from 'axios';
import config from '../../server/config.json';

const apiUrl = baseUrl+"/product";
const store = `?store=${config[0].store_id}`;
let url = apiUrl + store;


export let fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsBegin())
        return axios.get(url, headers).then(
            (response) => {
                dispatch(fetchProductsSuccess(response.data));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

export const fetchProductsBegin = () => ({
  type: 'FETCH_PRODUCTS_BEGIN'
});

export const fetchProductsSuccess = products => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: 'FETCH_PRODUCTS_FAILURE',
  payload: { error }
});