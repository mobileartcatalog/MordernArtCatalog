import axios from 'axios';
// import exhData from './data';

const ADDING_EXH = 'ADDING_EXH';
const ADDED_EXH = 'ADDED_EXH';

const addingExh = () => ({
  type: 'ADDING_EXH'
});

const addedExh = exh => ({
  type: 'ADDED_EXH',
  exh
});

export const addExh = exh => {
  return async dispatch => {
    try {
      dispatch(addingExh());
      // const data = await axios.post('http://localhost:3000/api/exhibitions');
      // let newExh = data.createExhibition;
      console.log('exh', exh)
      dispatch(addedExh(exh));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADDING_EXH:
      return { ...state, loading: true };
    case ADDED_EXH:
      const newExhList = state.all;
      return {
        ...state,
        loading: false,
        all: newExhList,
        count: newExhList.length
      };
    default:
      return state;
  }
};

export default reducer;
