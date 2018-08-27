import { baseUrl, headers } from "../../const/global";
let axios = require('axios');

export let fetchCSAOrders = (oId) => {
    return (dispatch) => {
        let orderID = `?orderId=${oId}`;
        let url = baseUrl + '/order' + orderID;
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

export const fetchCSAOrdersSuccess = order => ({
  type: 'FETCH_ORDERS_SUCCESS',
  payload: { order }
});