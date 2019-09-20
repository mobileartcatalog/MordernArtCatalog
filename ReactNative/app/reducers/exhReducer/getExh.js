import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const GETTING_EXH = 'GETTING_EXH';
const GOT_EXH = 'GOT_EXH';

const gettingExh = () => ({
  type: 'GETTING_EXH',
});

const gotExh = data => ({
  type: 'GOT_EXH',
  data,
});

export const getExh = () => {
  return async dispatch => {
    try {
      dispatch(gettingExh());
      const { data } = await axios.get(`${BASE_URL}/api/exhibitions`);
      dispatch(gotExh(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case GETTING_EXH:
      return { ...state, loading: true };
    case GOT_EXH:
      return {
        ...state,
        loading: false,
        loaded: true,
        all: action.data,
        count: action.data.length,
      };
    default:
      return state;
  }
};

export default reducer;
