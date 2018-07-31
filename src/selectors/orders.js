export const selectOrders = (orderItems, {order = ''}) => {
  return orderItems.filter((orderItem) => {
    const textMatch = orderItem.id.toLowerCase().includes(order.toLowerCase());
    return textMatch;
  });
};


export const filterByCounter = (orderItems, {counter = ''}) => {
  if(counter === ''){
    return orderItems;
  }
  return orderItems.filter((orderItem) => {
    const textMatch = orderItem.counters.find(x => x.counterName.toLowerCase() === counter);
    return textMatch;
  });
};
