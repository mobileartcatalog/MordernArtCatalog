import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const LINKING_ART_TO_EXH = 'LINKING_ART_TO_EXH';
const LINKED_ART_TO_EXH = 'LINKED_ART_TO_EXH';

const linkingArt = (exhId, artId) => ({
  type: LINKING_ART_TO_EXH,
  exhId,
  artId,
});

const linkedArt = exh => ({
  type: LINKED_ART_TO_EXH,
  exh,
});

export const linkingArtToExh = (exhId, artId) => {
  return async dispatch => {
    try {
      dispatch(linkingArt(exhId, artId));
      const { data } = await axios.get(`${BASE_URL}/api/exhibitions/${id}`);
      dispatch(linkedArt(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case LINKING_ART_TO_EXH:
      return { ...state, loading: true };
    case LINKED_ART_TO_EXH:
      return {
        ...state,
        loading: false,
        selected: action.exh,
        artworkIds: action.exh.artworks,
      };

    default:
      return state;
  }
};

export default reducer;
