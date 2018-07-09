

export default (item) => {
    return item
        .map((item) => (item.quantity * item.option.price.price))
        .reduce((sum, value) => sum+value,0);
};

