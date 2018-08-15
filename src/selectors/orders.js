export const selectOrders = (orderItems, {order = ''}) => {
  return orderItems.filter((orderItem) => {
    const textMatch = orderItem.id.toLowerCase().includes(order.toLowerCase()) || orderItem.customerName.toLowerCase().includes(order.toLowerCase());
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

export const filterByStatus = (orderItems, {status = 0}) => {
  return orderItems.filter((orderItem) => {
    const textMatch = orderItem.status === status;
    return textMatch;
  });
};


export const orderFilterByCounter = (orderItems, text) => {
  if(text === ''){
    return orderItems;
  }
  return orderItems.filter((orderItem) => {
    const textMatch = orderItem.product.counter.toLowerCase() === text;
    return textMatch;
  });
};
