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


//Dispatch Order
export function dispatchOrder(order) {
    return dispatch => {
        console.log(order);
    };
}
  
  