
const initialState = {
    csaOrder: {},
    loading: false,
    error: null
};

export default function csaOrderReducer(state = initialState, action) {
    switch(action.type) {
      case 'FETCH_ORDER_SUCCESS':
        return {
            ...state,
            loading: false,
            csaOrder: action.order
        };
  
      default:
        return state;
    }
  }