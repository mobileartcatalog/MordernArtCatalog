import axios from 'axios';
import exhData from './data';

const GETTING_EXH = 'GETTING_EXH';
const GOT_EXH = 'GOT_EXH';

const gettingExh = () => ({
  type: 'GETTING_EXH'
});

const gotExh = data => ({
  type: 'GOT_EXH',
  data
});

export const getExh = () => {
  return async dispatch => {
    try {
      dispatch(gettingExh());
      const data = exhData;
      // const { data } = await axios.get('http://localhost:3000/api/exhibitions');

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
        count: action.data.length
      };
    default:
      return state;
  }
};

export default reducer;
