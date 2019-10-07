import reduceReducers from 'reduce-reducers';

import getExh from './getExh';
import getExhDetail from './getExhDetail';
import addExh from './addExh';
import updateExh from './updateExh';
import deleteExh from './deleteExh';
import linkArtToExh from './linkArtToExh';
import filterExh from './filterExh';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  all: [],
  selected: {},
  count: 0,
  artworkIds: [],
  artworkIdsToLink: [],
  searchTerm: '',
  filtered: [],
  filteredCount: 0,
};

const exhReducer = reduceReducers(
  initialState,
  getExh,
  getExhDetail,
  addExh,
  updateExh,
  deleteExh,
  linkArtToExh,
  filterExh
);

export default exhReducer;
