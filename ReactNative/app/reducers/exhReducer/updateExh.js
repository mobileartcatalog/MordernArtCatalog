import axios from 'axios';

const UPDATING_EXH = 'UPDATING_EXH';
const UPDATED_EXH = 'UPDATED_EXH';

const updatingExh = () => ({
  type: UPDATING_EXH,
});

const updatedExh = exh => ({
  type: UPDATED_EXH,
  exh,
});

export const updateExh = (id, exhData) => {
  return async dispatch => {
    try {
      dispatch(updatingExh());
      const { data } = await axios.patch(
        `/api/exhibitions/${id}`,
        JSON.stringify(exhData)
      );
      dispatch(updatedExh(id, data));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATING_EXH:
      return { ...state, loading: true };
    case UPDATED_EXH:
      return {
        ...state,
        loading: false,
        all: state.all.map(exh => {
          if (exh._id === action.id) {
            return action.exh;
          } else return exh;
        }),
        selected: action.exh,
      };
    default:
      return state;
  }
};

export default reducer;
