
const initialState = {
    order: {
        client: {

        },
        items: []
    },
    loading: false,
    error: null
};

export default function csaOrderReducer(state = initialState, action) {
    switch(action.type) {
      case 'FETCH_ORDER_SUCCESS':
        return {
            ...state,
            loading: false,
            order: action.payload.order
        };
  
      default:
        return state;
    }
  }