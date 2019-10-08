import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';

const DELETED_ARTWORK = 'DELETED_ARTWORK';

const deletedArtwork = id => ({
  type: 'DELETED_ARTWORK',
  id,
});

export const deleteArtwork = id => {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/api/artworks/${id}`);
      dispatch(deletedArtwork(id));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case DELETED_ARTWORK:
      let updatedArtList = state.all.filter(art => art._id !== action.id);
      let updatedCount = updatedArtList.length;
      let updatedFilteredList = state.filtered.filter(
        art => art._id !== action.id
      );
      let updatedFilteredCount = updatedFilteredList.length;
      return {
        ...state,
        all: updatedArtList,
        count: updatedCount,
        filtered: updatedFilteredList,
        filteredCount: updatedFilteredCount,
        selected: {},
      };
    default:
      return state;
  }
};

export default reducer;
