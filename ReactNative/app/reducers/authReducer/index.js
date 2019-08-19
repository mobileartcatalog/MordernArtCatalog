import reduceReducers from 'reduce-reducers';

import authUser from './authUser';

const initialState = {
  authenticated: false,
  error: null
};
const authReducer = reduceReducers(initialState, authUser);

export default authReducer;
