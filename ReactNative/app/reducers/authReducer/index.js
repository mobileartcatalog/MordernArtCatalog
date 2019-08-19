import reduceReducers from 'reduce-reducers';

import loginUser from './authUser';
import signupUser from './authUser';

const initialState = {
  authenticated: false,
  error: null,
  uid: '',
  email: ''
};

const authReducer = reduceReducers(initialState, loginUser, signupUser);

export default authReducer;
