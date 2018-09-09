
const initialState = {
    order: {
        client: {
            name:'',
            email: '',
            phoneNo: '',
            tyrNumber: ''
        },
        pickupDate: '',
        pickupTime: '',
        status: '',
        isPaid: '',
        items: []
    },
    loading: false,
    error: null
};

export default function csaOrderReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_ORDER_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'FETCH_ORDER_SUCCESS':
            return {
                ...state,
                loading: false,
                order: action.payload.order
            };
        case 'EMPTY_ORDER':
            return {
                ...state,
                loading: false,
                initialState
            };
  
      default:
        return state;
    }
  }