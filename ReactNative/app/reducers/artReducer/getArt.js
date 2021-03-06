import axios from "axios";
import { BASE_URL } from 'react-native-dotenv';

const GETTING_ART = "GETTING_ART";
const GOT_ART = "GOT_ART";

const gettingArt = () => ({
  type: "GETTING_ART"
});

const gotArt = data => ({
  type: "GOT_ART",
  data
});

export const getArt = uid => {
  return async dispatch => {
    try {
      dispatch(gettingArt());
      const { data } = await axios.get(
        `${BASE_URL}/api/artworks/user/${uid}`
      );
      dispatch(gotArt(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case GETTING_ART:
      return { ...state, loading: true };
    case GOT_ART:
      return {
        ...state,
        loading: false,
        loaded: true,
        all: action.data,
        count: action.data.length
      };
    default:
      return state;
  }
};

export default reducer;
