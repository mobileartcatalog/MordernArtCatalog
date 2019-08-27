import axios from 'axios';

//action type
const GETTING_ARTWORKS = 'GETTING_ARTWORKS';
const SET_ARTWORKS = 'SET_ARTWORKS';
const ADD_ARTWORK = 'ADD_ARTWORK';
const SET_SINGLEART = 'SET_SINGLEART';
const UPDATE_ARTWORK = 'UPDATE_ARTWORK';

//action creator
const gettingArtworks = () => ({ type: GETTING_ARTWORKS });
const setArtworks = artworks => ({ type: SET_ARTWORKS, artworks });
const addArtwork = artwork => ({ type: ADD_ARTWORK, artwork });
const setSingleArt = selected => ({
  type: SET_SINGLEART,
  selected
});
const updateArtwork = (id, data) => ({
  type: UPDATE_ARTWORK,
  data,
  id
});

//thunk creator
export const fetchArtworks = () => {
  return async dispatch => {
    try {
      dispatch(gettingArtworks());
      const { data } = await axios.get('/api/artworks');
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
      const { data } = await axios.post('/api/artworks', fd);
      dispatch(addArtwork(data.createArtwork));
    } catch (err) {
      console.log('Add artwork goes wrong.');
    }
  };
};

export const fetchSingleArt = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/artworks/${id}`);
      console.log('fetchSingle by id', data);
      dispatch(setSingleArt(data));
    } catch (err) {
      console.log('Fetching a singel artwork goes wrong');
    }
  };
};

export const updateArtThunk = (id, updateData) => {
  return async dispatch => {
    try {
      console.log('in thunk,', updateData);
      const fd = new FormData();
      for (let i = 0; i < updateData.length; i++) {
        fd.append('artworkpics', updateData[i]);
      }
      console.log('formdata in thunk,', fd);

      const { data } = await axios.patch(`/api/artworks/${id}`, fd);
      console.log('in thunk @@@@@the returned from patch', data);
      ///use data.images to query from Image collection, create a image api
      ///dispatch the data as selected, and image data to a new state
      dispatch(updateArtwork(id, data));
    } catch (err) {
      console.error(err);
    }
  };
};

export //reducer

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
    case SET_SINGLEART:
      return { ...state, selected: action.selected, loading: false };
    case ADD_ARTWORK:
      return { ...state, all: [...state.all, action.artwork] };
    case UPDATE_ARTWORK:
      let updateArtworks = state.all.map(artwork => {
        if (artwork._id === action.id) {
          return action.data;
        } else {
          return artwork;
        }
      });
      return { ...state, all: updateArtworks, selected: action.data };
    default:
      return state;
  }
};

export default reducer;
