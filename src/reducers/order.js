// Order Reducer Default
const orderReducerDefaultState = {
    orderId: '',
    pickUpDate: '',
    time: '',
    status: '',
    createdAt: ''
};

export default (state = orderReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return action.order;
    case 'RESET_ORDER':
      return {};
    default:
      return state;
  }
};