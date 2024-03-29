const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function ordersReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ORDERS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.orders
      };

    case 'FETCH_ORDERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}