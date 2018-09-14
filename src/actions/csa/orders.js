import { baseUrl, headers } from "../../const/global";
import axios from 'axios';

import config from '../../server/config.json';
import { connect } from "react-redux";


export let fetchCSAOrders = (storeID) => {
    let store_id = storeID ? storeID : config[0].store_id;
    const apiUrl = baseUrl+"/order/active";
    let store = `?storeid=${store_id}`;
    let url = apiUrl + store;    
    return (dispatch) => {
        dispatch(fetchCSAOrdersBegin())
        return axios.get(url, headers).then(
            (response) => {
                dispatch(fetchCSAOrdersSuccess(response.data));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}


export const fetchCSAOrdersBegin = () => ({
  type: 'FETCH_ORDERS_BEGIN'
});

export const fetchCSAOrdersSuccess = orders => ({
  type: 'FETCH_ORDERS_SUCCESS',
  payload: { orders }
});

export const fetchCSAOrdersFailure = error => ({
  type: 'FETCH_ORDERS_FAILURE',
  payload: { error }
});