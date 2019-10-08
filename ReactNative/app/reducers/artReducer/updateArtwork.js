import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const UPDATING_ART = 'UPDATING_ART';
const UPDATED_ART = 'UPDATED_ART';

const updatingArt = () => ({
  type: UPDATING_ART,
});

const updatedArt = (id, art) => ({
  type: UPDATED_ART,
  id,
  art,
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

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATING_ART:
      return {
        ...state,
        loading: true,
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
        selected: action.art,
      };
    default:
      return state;
  }
};

export default reducer;
