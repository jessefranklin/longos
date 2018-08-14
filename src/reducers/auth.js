
const profileReducerDefaultState = {};

export default (state = profileReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.profile;
    case 'RESET_PROFILE':
      return {};
    default:
      return state;
  }
};