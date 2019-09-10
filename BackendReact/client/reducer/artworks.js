import axios from 'axios';

//action type
const GETTING_ARTWORKS = 'GETTING_ARTWORKS';
const SET_ARTWORKS = 'SET_ARTWORKS';
const ADD_ARTWORK = 'ADD_ARTWORK';
const SET_SINGLEART = 'SET_SINGLEART';
const UPDATE_ARTWORK = 'UPDATE_ARTWORK';
const DETELE_ARTWORK = 'DETELE_ARTWORK';

//action creator
const gettingArtworks = () => ({ type: GETTING_ARTWORKS });
const setArtworks = artworks => ({ type: SET_ARTWORKS, artworks });
const addArtwork = artwork => ({ type: ADD_ARTWORK, artwork });
const setSingleArt = selected => ({
  type: SET_SINGLEART,
  selected
});
const updateArtwork = (id, updateData) => ({
  type: UPDATE_ARTWORK,
  updateData,
  id
});
const deleteArtwork = id => ({
  type: DETELE_ARTWORK,
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
      const fd = new FormData();
      let keys = Object.keys(artwork);
      keys.forEach(key => {
        fd.append(`${key}`, artwork[key]);
      });
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
      dispatch(setSingleArt(data));
    } catch (err) {
      console.log('Fetching a singel artwork goes wrong');
    }
  };
};

export const updateArtThunk = (id, updateData) => {
  return async dispatch => {
    try {
      console.log('let me see updataData', updateData);
      const fd = new FormData();
      for (let i = 0; i < updateData.length; i++) {
        fd.append('artworkpics', updateData[i]);
      }
      console.log('!!!!let me see fd', fd);
      const { data } = await axios.patch(`/api/artworks/${id}`, fd);
      console.log('in thunk @@@@@the returned from patch', data);

      dispatch(updateArtwork(id, data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteArtworkthunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/artworks/${id}`);
      dispatch(deleteArtwork(id));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  all: [],
  selected: {},
  images: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_ARTWORKS:
      return { ...state, loading: true };
    case SET_ARTWORKS:
      return { ...state, loading: false, all: action.artworks };
    case SET_SINGLEART:
      return {
        ...state,
        selected: action.selected.artwork,
        images: action.selected.images,
        loading: false
      };
    case ADD_ARTWORK:
      return { ...state, all: [...state.all, action.artwork] };
    case UPDATE_ARTWORK:
      return {
        ...state,
        all: state.all.map(artwork => {
          if (artwork._id === action.id) {
            return action.updateData.artwork;
          } else {
            return artwork;
          }
        }),
        selected: action.updateData.artwork,
        images: [...state.images, ...action.updateData.images]
      };
    case DETELE_ARTWORK:
      return {
        ...state,
        all: state.all.filter(art => art._id !== action.id)
      };
    default:
      return state;
  }
};

export default reducer;
