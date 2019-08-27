const SEARCH_RESULTS = 'SEARCH_RESULTS';

const searchResults = results => ({
  type: 'SEARCH_RESULTS',
  results
});

export const setSearchResults = () => {
  return async dispatch => {
    try {
      dispatch(searchResults(results));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, searchResults: action.results };
    default:
      return state;
  }
};

export default reducer;
