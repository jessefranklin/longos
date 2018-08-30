import { baseUrl } from "../../const/global";
let axios = require('axios');
import config from '../../server/config.json';

// const apiUrl = "http://digitalpreorder.azurewebsites.net/api/order/active";
import { connect } from "react-redux";

const apiUrl = baseUrl+"/order/active";
const store = `?storeid=${config[0].store_id}`;
let url = apiUrl + store;

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchCSAOrders = () => {
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