let axios = require('axios');
const orderApi  = "http://digitalpreorder.azurewebsites.net/api/order";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}

const payload = {acceptTerms:true,"orderId":null,"StoreId":"store1","StoreZone":"6","customer":{"customerId":"c1","Name":"Alex","PhoneNumber":"416-555-5556","OtherPhoneNumber":null,"Email":"alex@ctoboost.com"},"PickupDateTime":"2018-07-15T00:00:00-04:00","IsPaid":false,"OrderItems":[{"ProductId":"p103","ProductName":"Maki Roll & Nigiri Platter","ProductOptionId":"p103-Regular","ProductOptionName":"Regular","ProductPriceId":"p103-Regular-6","Quantity":1,"Comment":null,"Price":29.99,"Tax":3.8987,"TaxName":"HST"},{"ProductId":"p42","ProductName":"New York Style Deli","ProductOptionId":"p42-Regular","ProductOptionName":"Regular","ProductPriceId":"p42-Regular-6","Quantity":1,"Comment":null,"Price":39.99,"Tax":5.1987000000000005,"TaxName":"HST"},{"ProductId":"p44","ProductName":"Sandwich Combo","ProductOptionId":"p44-Large","ProductOptionName":"Large","ProductPriceId":"p44-Large-6","Quantity":2,"Comment":null,"Price":49.99,"Tax":6.4987,"TaxName":"HST"},{"ProductId":"p36","ProductName":"Artisan Baguette Sandwiches","ProductOptionId":"p36-Large","ProductOptionName":"Large","ProductPriceId":"p36-Large-6","Quantity":1,"Comment":null,"Price":59.99,"Tax":7.7987,"TaxName":"HST"},{"ProductId":"p69","ProductName":"Longo?s Signature Dessert Tray","ProductOptionId":"p69-Regular","ProductOptionName":"Regular","ProductPriceId":"p69-Regular-6","Quantity":2,"Comment":null,"Price":39.99,"Tax":5.1987000000000005,"TaxName":"HST"}]};

//Dispatch Order
export function dispatchOrder(order) {
    return (dispatch) => {
        console.log(order);
        return axios.post(orderApi,order,headers).then(
            (response) => {
                console.log(response.data);
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


