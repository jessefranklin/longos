
let axios = require('axios');


const headers = {
    header: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

export let fetchCSAPastOrders = (url) => {
    return (dispatch) => {
        return axios.get(url, headers).then(
            (response) => {
                if(response.data.length){
                    dispatch(setPastOrder(response.data));
                }
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

// SET_ORDER
export const setPastOrder = (order) => ({
    type: 'SET_PASTORDER',
    order
});

// EDIT ORDER
export const editPastOrder = (updates) => ({
    type: 'EDIT_PASTORDER',
    updates
});


// RESET ORDER
export const resetPastOrder = () => ({
    type: 'RESET_PASTORDER'
});