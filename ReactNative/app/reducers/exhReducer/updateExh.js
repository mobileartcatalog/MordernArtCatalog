import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const UPDATING_EXH = 'UPDATING_EXH';
const UPDATED_EXH = 'UPDATED_EXH';

const updatingExh = () => ({
  type: UPDATING_EXH
});

const updatedExh = (id, exh) => ({
  type: UPDATED_EXH,
  id,
  exh
});

export const updateExh = (id, exhData) => {
  return async dispatch => {
    try {
      dispatch(updatingExh());
      const { data } = await axios.patch(
        `${BASE_URL}/api/exhibitions/${id}`,
        exhData
      );
      dispatch(updatedExh(id, data));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATING_EXH:
      return { ...state, loading: true };
    case UPDATED_EXH:
      return {
        ...state,
        loading: false,
        all: state.all.map(exh => {
          if (exh._id === action.id) {
            return action.exh;
          } else return exh;
        }),
        filtered: state.filtered.map(exh => {
          if (exh._id === action.id) {
            return action.exh;
          } else return exh;
        }),
        selected: action.exh
      };
    default:
      return state;
  }
};

export default reducer;
