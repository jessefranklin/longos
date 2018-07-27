
let axios = require('axios');
import config from '../../server/config.json';

const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order`;
const orderID = `?orderId=O8184008`;
const orderIDs = `?storeid=${config[0].store_id}`;
let url = orderAPI + orderID;

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchCSAOrders = (oId) => {
    return (dispatch) => {
        console.log(oId);
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