/* eslint-disable complexity */
import axios from 'axios';

//action type
const LOADING = 'LOADING';
const SUBLOADING = 'SUBLOADING';
const SET_ARTWORKS = 'SET_ARTWORKS';
const ADD_ARTWORK = 'ADD_ARTWORK';
const SET_SINGLEART = 'SET_SINGLEART';
const UPDATE_ARTWORK = 'UPDATE_ARTWORK';
const DETELE_ARTWORK = 'DETELE_ARTWORK';
const SET_SUBLOADING_FALSE = 'SET_SUBLOADING_FALSE';
const CHANGE_MAINIMAGE = 'CHANGE_MAINIMAGE';
const UPDATE_IMAGE_ARRAY = 'UPDATE_IMAGES_ARRAY';

//action creator
const loading = () => ({ type: LOADING });
const subloading = () => ({ type: SUBLOADING });
const setArtworks = artworks => ({ type: SET_ARTWORKS, artworks });
const addArtwork = artwork => ({ type: ADD_ARTWORK, artwork });
const setSingleArt = selected => ({
  type: SET_SINGLEART,
  selected,
});
const updateArtwork = (id, updateData) => ({
  type: UPDATE_ARTWORK,
  updateData,
  id,
});
const deleteArtwork = id => ({
  type: DETELE_ARTWORK,
  id,
});
const setSubloadingFalse = () => ({
  type: SET_SUBLOADING_FALSE,
});
const changeMainimage = artwork => ({
  type: CHANGE_MAINIMAGE,
  artwork,
});
const updateImageArray = imageId => ({
  type: UPDATE_IMAGE_ARRAY,
  imageId,
});

//thunk creator
export const fetchArtworks = () => {
  return async dispatch => {
    try {
      dispatch(loading());
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
      console.log('in thunk add artwork', artwork);
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
      dispatch(loading());
      const { data } = await axios.get(`/api/artworks/${id}`);
      // const defaultImg = { ...data.artwork.img1, _id: data.artwork._id };
      // data.images.unshift(defaultImg);
      dispatch(setSingleArt(data));
    } catch (err) {
      console.log('Fetching a singel artwork goes wrong');
    }
  };
};

export const updateArtThunk = (id, updateData) => {
  return async dispatch => {
    try {
      const fd = new FormData();
      for (let i = 0; i < updateData.length; i++) {
        fd.append('artworkpics', updateData[i]);
      }
      const { data } = await axios.patch(`/api/artworks/${id}`, fd);
      // const defaultImg = { ...data.artwork.img1, _id: data.artwork._id };
      // data.images.unshift(defaultImg);
      dispatch(updateArtwork(id, data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateArtInfo = (id, updateDate) => {
  return async dispatch => {
    try {
      const { data } = await axios.patch(`/api/artworks/${id}`, updateDate);
      dispatch(updateArtwork(id, data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteArtworkthunk = id => {
  return async dispatch => {
    try {
      dispatch(loading());
      await axios.delete(`/api/artworks/${id}`);
      dispatch(deleteArtwork(id));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteImagethunk = (imageId, artworkId) => {
  return async dispatch => {
    try {
      dispatch(subloading());
      await axios.delete(`/api/images/${imageId}`, {
        data: { artworkId: artworkId },
      });
      dispatch(updateImageArray(imageId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setSubloadingFalseThunk = () => {
  return async dispatch => {
    try {
      await dispatch(setSubloadingFalse());
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeMainimagethunk = (imageId, artworkId) => {
  return async dispatch => {
    try {
      dispatch(subloading());
      const { data } = await axios.patch(`/api/images/${imageId}`, {
        artworkId,
      });
      dispatch(changeMainimage(data.artwork));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  all: [],
  selected: {},
  images: [],
  loading: false,
  subloading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SUBLOADING:
      return { ...state, subloading: true };
    case SET_ARTWORKS:
      return { ...state, loading: false, all: action.artworks };
    case SET_SINGLEART:
      return {
        ...state,
        selected: action.selected.artwork,
        images: action.selected.images,
        loading: false,
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
        images:
          action.updateData.images.length > 0
            ? action.updateData.images
            : state.images,
      };
    case DETELE_ARTWORK:
      return {
        ...state,
        all: state.all.filter(art => art._id !== action.id),
        loading: false,
      };
    case SET_SUBLOADING_FALSE:
      return {
        ...state,
        subloading: false,
      };
    case UPDATE_IMAGE_ARRAY:
      let updatedArray = state.images.filter(
        item => item._id !== action.imageId
      );
      return {
        ...state,
        images: updatedArray,
      };
    case CHANGE_MAINIMAGE:
      return {
        ...state,
        selected: action.artwork,
        subloading: false,
      };
    default:
      return state;
  }
};

export default reducer;
