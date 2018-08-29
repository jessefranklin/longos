import { baseUrl, headers } from "../../const/global";
let axios = require('axios');

export const fetchCSAOrder = (oId) => {
    return (dispatch) => {
        let orderID = `?orderId=${oId}`;
        let url = baseUrl + '/order' + orderID;
        dispatch(fetchCSAOrderBegin())
        return axios.get(url, headers).then(
            (response) => {
                dispatch(fetchCSAOrderSuccess(response.data));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}


export const updateCSAOrder = (params,oId) => {
    return (dispatch) => {
        let url = baseUrl + '/order' + params;
        dispatch(fetchCSAOrderBegin())
        return axios.put(url, headers).then(
            (response) => {
                dispatch(fetchCSAOrder(oId));
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

export const fetchCSAOrderBegin = () => ({
  type: 'FETCH_ORDER_BEGIN'
});

export const fetchCSAOrderSuccess = order => ({
  type: 'FETCH_ORDER_SUCCESS',
  payload: { order }
});