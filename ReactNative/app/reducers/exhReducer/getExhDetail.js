import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const GETTING_EXH_DETAIL = 'GETTING_EXH_DETAIL';
const GOT_EXH_DETAIL = 'GOT_EXH_DETAIL';

const gettingExhDetail = id => ({
  type: 'GETTING_EXH_DETAIL',
  id
});

const gotExhDetail = exh => ({
  type: 'GOT_EXH_DETAIL',
  exh
});

export const getExhDetail = id => {
  return async dispatch => {
    try {
      dispatch(gettingExhDetail());
      const { data } = await axios.get(`${BASE_URL}/api/exhibitions/${id}`);
      dispatch(gotExhDetail(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case GETTING_EXH_DETAIL:
      return { ...state, loading: true };
    case GOT_EXH_DETAIL:
      return { ...state, loading: false, selected: action.exh };
    default:
      return state;
  }
};

export default reducer;
