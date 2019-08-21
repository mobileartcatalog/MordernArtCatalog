import axios from 'axios';

//action type
const GETTING_ARTWORKS = 'GETTING_ARTWORKS';
const SET_ARTWORKS = 'SET_ARTWORKS';
const ADD_ARTWORK = 'ADD_ARTWORK';

//action creator
const gettingArtworks = () => ({ type: GETTING_ARTWORKS });
const setArtworks = artworks => ({ type: SET_ARTWORKS, artworks });
const addArtwork = artwork => ({ type: ADD_ARTWORK, artwork });

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

export const addArtworkThunk = artwork => {
  return async dispatch => {
    try {
      const { img1, title, date, medium, dimension } = artwork;
      const fd = new FormData();
      fd.append('img1', img1);
      fd.append('title', title);
      fd.append('date', date);
      fd.append('medium', medium);
      fd.append('dimension', dimension);
      axios
        .post('http://localhost:3000/api/artworks', fd)
        .then(res => console.log(res));
      //not sure the data structure to pass into the action creator
      // dispatch ( addArtwork () )
    } catch (err) {
      console.log('Add artwork goes wrong.');
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
    case ADD_ARTWORK:
      return { ...state, all: [...state.all, action.artwork] };
    default:
      return state;
  }
};

export default reducer;
