
// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  status: 0,
  counter: '',
  counterorders: ''
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_ORDER_FILTER':
      return {
        ...state,
        order: action.text
      };
    case 'FILTER_BY_COUNTER':
      return {
        ...state,
        counter: action.text
      };
    case 'FILTER_BY_ORDER_COUNTER':
      return {
        ...state,
        orderfilter: action.text
      };
    case 'FILTER_BY_STATUS':
      return {
        ...state,
        status: action.text
      };
    default:
      return state;
  }
};