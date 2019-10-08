const FILTER_ART = 'FILTER_ART';

const filterArt = searchTerm => ({
  type: FILTER_ART,
  searchTerm,
});

export const filterArtThunk = searchTerm => {
  return async dispatch => {
    try {
      await dispatch(filterArt(searchTerm));
    } catch (error) {
      console.error(error);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_ART:
      let filteredList = state.all.filter(item => {
        const textToSearch = `${item.title.toLowerCase()} ${item.medium.toLowerCase()} ${item.date.toLowerCase()}`;
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
