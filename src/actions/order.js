import { baseUrl, headers } from "../const/global";
let axios = require('axios');

const orderApi  = baseUrl+"/order/add";

//Dispatch Order
export function dispatchOrder(order) {
    return (dispatch) => {
        return axios.post(orderApi,order,headers).then(
            (response) => {
                dispatch(editOrder({ orderId: response.data }));
            },
            (err) => {
                console.log(err);
            }
        )
    };
}

// SET_ORDER
export const setOrder = (order) => ({
    type: 'SET_ORDER',
    order
});

// EDIT ORDER
export const editOrder = (updates) => ({
    type: 'EDIT_ORDER',
    updates
});


// RESET ORDER
export const resetOrder = () => ({
    type: 'RESET_ORDER'
});


