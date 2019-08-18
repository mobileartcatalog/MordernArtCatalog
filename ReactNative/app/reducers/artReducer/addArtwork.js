import axios from 'axios';

const ADDED_ART = 'ADDED_ART';

const addedArt = artwork => ({
  type: 'ADDED_ART',
  artwork
});

export const addArt = artwork => {
  return async dispatch => {
    try {
      const { title, date, medium, dimensions, imageData, imageType } = artwork;
      const artData = {
        title,
        date,
        medium,
        dimensions,
        img1: {
          data: imageData,
          contentType: imageType
        }
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/artworks',
        artData
      );
      dispatch(addedArt(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADDED_ART:
      return { ...state, all: [...state.all, action.art] };
    default:
      return state;
  }
};

export default reducer;
