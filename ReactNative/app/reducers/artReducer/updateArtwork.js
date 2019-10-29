import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const UPDATING_ART = 'UPDATING_ART';
const UPDATED_ART = 'UPDATED_ART';
const UPDATE_IMAGE_ARRAY = 'UPDATE_IMAGE_ARRAY';
const SET_MAIN_IMAGE = 'SET_MAIN_IMAGE';

const updatingArt = () => ({
  type: UPDATING_ART
});

const updatedArt = (id, art) => ({
  type: UPDATED_ART,
  id,
  art
});

const updateImageArray = imageId => ({
  type: UPDATE_IMAGE_ARRAY,
  imageId,
});

const setMainImage = (imageId, artwork) => ({
  type: SET_MAIN_IMAGE,
  imageId,
  artwork,
});

export const updateArtwork = (id, artData) => {
  return async dispatch => {
    try {
      dispatch(updatingArt());
      const { data } = await axios.patch(
        `${BASE_URL}/api/artworks/${id}`,
        artData
      );
      dispatch(updatedArt(id, data.artwork));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setMainImageThunk = (imageId, artworkId) => {
  return async dispatch => {
    try {
      dispatch(updatingArt());
      const { data } = await axios.patch(`${BASE_URL}/api/images/${imageId}`, {
        artworkId,
      });
      console.log('patched');
      dispatch(setMainImage(imageId, data.artwork));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteImage = (imageId, artworkId) => {
  return async dispatch => {
    try {
      dispatch(updatingArt());
      await axios.delete(`${BASE_URL}/api/images/${imageId}`, {
        data: { artworkId: artworkId },
      });
      dispatch(updateImageArray(imageId));
    } catch (err) {
      console.log(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATING_ART:
      return {
        ...state,
        loading: true
      };
    case UPDATED_ART:
      return {
        ...state,
        loading: false,
        all: state.all.map(art => {
          if (art._id === action.id) {
            return action.art;
          } else return art;
        }),
        filtered: state.filtered.map(art => {
          if (art._id === action.id) {
            return action.art;
          } else return art;
        }),
        selected: action.art
      };
    case SET_MAIN_IMAGE:
      const shiftToFront = (data, id) => {
        let i = data.findIndex(item => item.id === id);
        if (i > 0) {
          let item = data[i];
          data.splice(i, 1);
          data.unshift(item);
        }
      };
      let shiftedArray = shiftToFront(state.images, action.imageId);
      return {
        ...state,
        selected: action.artwork,
        images: shiftedArray,
        loading: false,
      };
    case UPDATE_IMAGE_ARRAY:
      let updatedArray = state.images.filter(
        item => item._id !== action.imageId
      );
      return {
        ...state,
        images: updatedArray,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
