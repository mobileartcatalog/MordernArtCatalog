import axios from 'axios';

const GETTING_ARTWORK_DETAIL = 'GETTING_ARTWORK_DETAIL';
const GOT_ARTWORK_DETAIL = 'GOT_ARTWORK_DETAIL';

const gettingArtworkDetail = id => ({
  type: 'GETTING_ARTWORK_DETAIL',
  id
});

const gotArtworkDetail = art => ({
  type: 'GOT_ARTWORK_DETAIL',
  art
});

export const getArtworkDetail = id => {
  return async dispatch => {
    try {
      dispatch(gettingArtworkDetail());
      const { data } = await axios.get(
        `http://localhost:3000/api/artworks/${id}`
      );
      dispatch(gotArtworkDetail(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case GETTING_ARTWORK_DETAIL:
      return { ...state, loading: true };
    case GOT_ARTWORK_DETAIL:
      console.log('in thunk reducer', action.art);
      return {
        ...state,
        loading: false,
        selected: action.art.artwork,
        images: action.art.images
      };
    default:
      return state;
  }
};

export default reducer;
