import axios from 'axios';

//action type
const GETTING_ARTWORKS = 'GETTING_ARTWORKS';
const SET_ARTWORKS = 'SET_ARTWORKS';

//action creator
const gettingArtworks = () => ({ type: GETTING_ARTWORKS });
const setArtworks = artworks => ({ type: SET_ARTWORKS, artworks });

//thunk creator
export const fetchArtworks = () => {
  return async dispatch => {
    try {
      dispatch(gettingArtworks());
      const { data } = await axios.get('http://localhost:3000/api/artworks');
      dispatch(setArtworks(data));
    } catch (err) {
      console.log('Fetching all artworks goes wrong.');
    }
  };
};

//reducer

const initialState = {
  all: [],
  selected: {},
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_ARTWORKS:
      return { ...state, loading: true };
    case SET_ARTWORKS:
      return { ...state, loading: false, all: action.artworks };
    default:
      return state;
  }
};

export default reducer;
