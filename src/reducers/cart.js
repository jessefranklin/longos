// Filters Reducer
const cartReducerDefaultState = [];

export default (state = cartReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        action.product
      ];
    case 'REMOVE_ITEM':
      return state.filter(({ id }) => id !== action.id);
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