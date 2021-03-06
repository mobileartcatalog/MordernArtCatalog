import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const UPLOAD_IMAGES = 'UPLOAD_IMAGES';

const uploadImages = (id, updateData) => ({
  type: UPLOAD_IMAGES,
  id,
  updateData
});

export const uploadImagesthunk = (id, images) => {
  return async dispatch => {
    try {
      const fd = new FormData();
      for (let i = 0; i < images.length; i++) {
        fd.append('artworkpics', {
          uri: images[i].uri,
          type: images[i].type,
          name: images[i].name
        });
      }
      const { data } = await axios.patch(
        `${BASE_URL}/api/artworks/${id}`,
        fd
      );
      dispatch(uploadImages(id, data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return {
        ...state,
        // all: state.all.map(artwork => {
        //   if (artwork._id === action.id) {
        //     return action.updateData.artwork;
        //   } else {
        //     return artwork;
        //   }
        // }),
        selected: action.updateData.artwork,
        images: action.updateData.images
      };
    default:
      return state;
  }
};

export default reducer;
