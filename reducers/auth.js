import { LOGIN, SIGNUP } from '../actions/auth';
import { combineReducers } from 'redux';

const initialState = {
  token: null,
  userId: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
    user
})
export default rootReducer