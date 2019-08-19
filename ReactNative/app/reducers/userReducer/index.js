import reduceReducers from 'reduce-reducers';

// import getUser from './getUser';
import setUser from './setUser';

const initialState = {
  loading: false,
  user: {}
};

const userReducer = reduceReducers(initialState,  setUser);

export default userReducer;
