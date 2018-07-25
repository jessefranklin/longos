let axios = require('axios');
const orderApi  = "http://digitalpreorder.azurewebsites.net/api/order";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}

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


