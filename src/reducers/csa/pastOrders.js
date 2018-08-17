
const initialState = {
    orders: [],
    loading: false,
    error: null
};

export default function pastOrdersReducer(state = initialState, action) {
    switch(action.type) {
      case 'SET_PASTORDER':
        return {
          ...state,
          loading: false,
          orders: action.order
        };
  
      default:
        return state;
    }
  }