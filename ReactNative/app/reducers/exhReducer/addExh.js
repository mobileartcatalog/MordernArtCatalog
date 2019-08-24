import axios from 'axios';

const ADDED_EXH = 'ADDED_EXH';

const addedExh = exh => ({
  type: 'ADDED_EXH',
  exh
});

export const addExh = exh => {
  return async dispatch => {
    try {
      console.log('exh', exh);
      let { data } = await axios.post(
        'http://localhost:3000/api/exhibitions',
        exh
      );
      console.log('data.createExhibition', data.createExhibition)
      dispatch(addedExh(data.createExhibition));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADDED_EXH:
      // let updatedExhList = state.all.push(action.exh);
      return {
        ...state,
        all: [action.exh],
        selected: action.exh,
        count: 1
      };
    default:
      return state;
  }
};

export default reducer;
