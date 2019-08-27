import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const ADDING_EXH = 'ADDING_EXH'
const ADDED_EXH = 'ADDED_EXH';

const addingExh = () => ({
  type: 'ADDING_EXH',
});

const addedExh = exh => ({
  type: 'ADDED_EXH',
  exh
});

export const addingExhForm = () => {
  return async dispatch => {
    dispatch(addingExh())
  }
}

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
    case ADDING_EXH: 
      return {
        ...state, formVisible: true,
      }
    case ADDED_EXH:
      let updatedExhList = [action.exh, ...state.all];
      let updatedCount = updatedExhList.length;
      return {
        ...state,
        formVisible: false,
        all: updatedExhList,
        count: updatedCount,
        selected: action.exh
      };

    default:
      return state;
  }
};

export default reducer;
