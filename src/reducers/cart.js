// Filters Reducer
const cartReducerDefaultState = [];

export default (state = cartReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        action.product
      ];
    case 'ADD_TO_CSA_CART':
      return action.products;
    case 'EDIT_CSA_CART':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        };
      });
    case 'REMOVE_ITEM':
      return state.filter(({ id }) => id !== action.id);
    case 'EMPTY_CART':
      return {};
    case 'EDIT_ITEM':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        };
      });
    default:
      return state;
  }
};