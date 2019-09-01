import axios from 'axios';

const ADDED_ART = 'ADDED_ART';

const addedArt = artwork => ({
  type: 'ADDED_ART',
  artwork
});

export const addArt = artwork => {
  return async dispatch => {
    try {
      const { title, date, medium, dimension, img1 } = artwork;
      const fd = new FormData();
      fd.append('img1', {
        uri: img1.uri,
        type: img1.type,
        name: img1.fileName
      });
      fd.append('title', title);
      fd.append('date', date);
      fd.append('medium', medium);
      fd.append('dimension', dimension);
      const { data } = await axios.post(
        'http://localhost:3000/api/artworks',
        fd
      );
      dispatch(addedArt(data.createArtwork));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADDED_ART:
      return {
        ...state,
        all: [...state.all, action.artwork],
        count: state.count + 1
      };
    default:
      return state;
  }
};

export default reducer;
