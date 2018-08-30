

export const cartTotal = (item) => {
    return item
        .map((item) => (item.quantity * item.price))
        .reduce((sum, value) => sum+value,0);
};


export const totalCount = (item) => {
    if(item.length > 0){        
        return item
            .map((item) => (item.quantity))
            .reduce((sum, value) => sum+value,0);
    } else {
        return 0;
    }
}


export const cartTax = (item) => {
    return item
        .map((item) => (item.quantity * item.tax))
        .reduce((sum, value) => sum+value,0);
}


