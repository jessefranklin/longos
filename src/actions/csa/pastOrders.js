
let axios = require('axios');
import config from '../../server/config.json';

const orderAPI = `http://digitalpreorder.azurewebsites.net/api/order/pickedup`;
const orderIDs = `?storeid=${config[0].store_id}`;
let url = orderAPI + orderIDs;

const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchCSAPastOrders = (oId) => {
    return (dispatch) => {
        // dispatch(fetchCSAOrdersBegin())
        return axios.get(url, headers).then(
            (response) => {
                console.log(response.data);
                // dispatch(fetchCSAOrdersSuccess(response.data));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

