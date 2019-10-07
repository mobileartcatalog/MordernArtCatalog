const FILTER_EXH = 'FILTER_EXH';

const filterExh = searchTerm => ({
  type: FILTER_EXH,
  searchTerm,
});

export const filterExhThunk = searchTerm => {
  return async dispatch => {
    try {
      await dispatch(filterExh(searchTerm));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_EXH:
      let filteredList = state.all.filter(item => {
        const textToSearch = `${item.title.toLowerCase()} ${item.venue.toLowerCase()} ${item.location.toLowerCase()} ${
          item.startDate
        } ${item.endDate}`;
        return textToSearch.includes(action.searchTerm.toLowerCase());
      });

      let filteredCount = filteredList.length;
      return {
        ...state,
        searchTerm: action.searchTerm,
        filtered: filteredList,
        filteredCount: filteredCount,
      };
    default:
      return state;
  }
};

export default reducer;
