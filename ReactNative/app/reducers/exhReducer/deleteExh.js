import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const deletedExh = id => ({
  type: 'DELETED_EXH',
  id
});

export const deleteExh = id => {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/api/exhibitions/${id}`);
      dispatch(deletedExh(id));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  let filteredExhList = state.all.filter(exh => exh._id !== action.id);
  return { ...state, all: filteredExhList };
};

export default reducer;
