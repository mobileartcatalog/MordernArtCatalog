import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const ADDED_EXH = 'ADDED_EXH';

const addedExh = exh => ({
  type: 'ADDED_EXH',
  exh
});

export const addExh = exh => {
  return async dispatch => {
    try {
      console.log('exh', exh);
      let { data } = await axios.post(`${BASE_URL}/api/exhibitions`, exh);
      dispatch(addedExh(data.createExhibition));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADDED_EXH:
      let updatedExhList = [action.exh, ...state.all];
      let updatedCount = updatedExhList.length;
      return {
        ...state,
        all: updatedExhList,
        count: updatedCount,
        selected: { ...action.exh }
      };

    default:
      return state;
  }
};

export default reducer;
