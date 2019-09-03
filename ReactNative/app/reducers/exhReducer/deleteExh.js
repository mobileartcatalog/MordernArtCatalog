import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const DELETED_EXH = 'DELETED_EXH';

const deletedExh = id => ({
  type: 'DELETED_EXH',
  id,
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
  switch (action.type) {
    case DELETED_EXH:
      let updatedExhList = state.all.filter(exh => exh._id !== action.id);
      let updatedCount = updatedExhList.length;
      return {
        ...state,
        all: updatedExhList,
        count: updatedCount,
      };
    default:
      return state;
  }
};

export default reducer;
