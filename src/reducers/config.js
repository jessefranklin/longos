// Order Reducer Default
const configReducerDefaultState = {};

export default (state = configReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return action.settings;
    case 'FETCH_CONFIG':
      return action.payload.config;
    case 'RESET_CONFIG':
      return {};
    default:
      return state;
  }
};