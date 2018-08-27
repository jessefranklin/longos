import { baseUrl } from "../../const/global";
import config from '../../server/config.json';
let axios = require('axios');

const orderID = `?orderId=O8184008`;
const orderIDs = `?storeid=${config[0].store_id}`;
let url = baseUrl + '/order' + orderID;

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchCSAOrders = (oId) => {
    return (dispatch) => {
        dispatch(fetchCSAOrdersBegin())
        return axios.get(url, headers).then(
            (response) => {
                console.log(response.data);
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