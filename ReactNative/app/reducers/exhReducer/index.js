import reduceReducers from 'reduce-reducers';

import getExh from './getExh';
import getExhDetail from './getExhDetail';
import addExh from './addExh';
import deleteExh from './deleteExh';
import search from './search';

const initialState = {
  loading: false,
  loaded: false,
  all: [],
  selected: {},
  count: 0,
  searchResults: [],
  artworkIds: []
};

const exhReducer = reduceReducers(
  initialState,
  getExh,
  getExhDetail,
  addExh,
  deleteExh,
  search
);

export default exhReducer;
