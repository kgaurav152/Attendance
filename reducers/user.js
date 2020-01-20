import { CREATE_USER } from '../actions/user';
  import User from '../../models/user';
  
  const initialState = {
      userId: '',
      email: '',
      role:''
    
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      
      case CREATE_USER:
        return {
            userId: action.userId,
            email: action.email,
            role: action.role
        };
        default:
            return state;
    };
  }
  const rootReducer = combineReducers({
    user
})
export default rootReducer
