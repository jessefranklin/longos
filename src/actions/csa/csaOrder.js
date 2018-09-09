import { baseUrl, headers } from "../../const/global";
import axios from 'axios';

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

export const updateCSAOrder = (url, payload) => {
    return (dispatch) => {
        dispatch(fetchCSAOrderBegin())
        return axios.put(url,payload,headers).then(
            (response) => {
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

export const updateCSAOrderState = (url) => {
    return (dispatch) => {
        dispatch(fetchCSAOrderBegin())
        return axios.put(url,headers).then(
            (response) => {
                console.log(response.data)
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

// EMPTY CART
export const clearCSAOrder = () => ({
    type: 'EMPTY_ORDER'
});

export const fetchCSAOrderBegin = () => ({
  type: 'FETCH_ORDER_BEGIN'
});

export const fetchCSAOrderSuccess = order => ({
  type: 'FETCH_ORDER_SUCCESS',
  payload: { order }
});