import axios from 'axios';

const UPLOAD_IMAGES = 'UPLOAD_IMAGES';

const uploadImages = (id, updateData) => ({
  type: 'UPLOAD_IMAGES',
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
        `http://localhost:3000/api/artworks/${id}`,
        fd
      );
      console.log('!!!!!From RN thunk id', id, typeof id);
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
        all: state.all.map(artwork => {
          if (artwork._id === action.id) {
            return action.updateData.artwork;
          } else {
            return artwork;
          }
        }),
        selected: action.updateData.artwork,
        images: action.updateData.images
      };
    default:
      return state;
  }
};

export default reducer;
