import axios from 'axios';
import userData from './data'

const findUser = (data, target) => {
  for(let i = 0; i < data.length; i++) {
    if(data[i].id === target) {
      return data[i]
    }
    return {}
  }

}

const GETTING_USER = 'GETTING_USER';
const GOT_USER = 'GOT_USER';

const gettingUser = id => ({
  type: 'GETTING_USER',
  id
});

const gotUser = user => ({
  type: 'GOT_USER',
  user
});

export const getUser = id => {
  return async dispatch => {
    try {
      dispatch(gettingUser(id));
      // const { data } = await axios.get(`http://localhost:3000/api/users/${id}`);
      const data = findUser(userData, id);
      dispatch(gotUser(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  console.log('action', action);
  switch (action.type) {
    case GETTING_USER:
      return { ...state, loading: true };
    case GOT_USER:
      return {
        ...state,
        loading: false,
        user: action.data
      };
    default:
      return state;
  }
};

export default reducer;
