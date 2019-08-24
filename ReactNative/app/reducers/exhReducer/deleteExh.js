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
  let updatedExhList = state.all.filter(exh => exh._id !== action.id);
  let updatedCount = updatedExhList.length;
  return {
    ...state,
    all: updatedExhList,
    count: updatedCount
  };
};

export default reducer;
