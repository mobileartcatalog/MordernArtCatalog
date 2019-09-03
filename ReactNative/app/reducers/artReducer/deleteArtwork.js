// import axios from 'axios';

const DELETED_ARTWORK = 'DELETED_ARTWORK'

const deletedArtwork = id => ({
  type: 'DELETED_ARTWORK',
  id,
});

export const deleteArtwork = id => {
  return async dispatch => {
    try {
      // await axios.delete(`/api/art/${id}`);
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
      return {
        ...state,
        all: updatedArtList,
        count: updatedCount,
      };
    default:
      return state;
  }
};

export default reducer;
