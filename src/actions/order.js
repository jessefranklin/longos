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
        console.log(order);

        return axios.post(orderApi,order,headers).then(
            (response) => {
                console.log(response.data);
                // dispatch(fetchProductsSuccess(response.data));
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
export const editOrder = (id, updates) => ({
    type: 'EDIT_ORDER',
    id,
    updates
});


// RESET ORDER
export const resetOrder = () => ({
    type: 'RESET_ORDER'
});


