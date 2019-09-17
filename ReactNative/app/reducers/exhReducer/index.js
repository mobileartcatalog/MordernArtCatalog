import reduceReducers from 'reduce-reducers';

import getExh from './getExh';
import getExhDetail from './getExhDetail';
import addExh from './addExh';
import updateExh from './updateExh';
import deleteExh from './deleteExh';
import linkArtToExh from './linkArtToExh';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  all: [],
  selected: {},
  count: 0,
  artworkIds: [],
  artworkIdsToLink: [],
};

const exhReducer = reduceReducers(
  initialState,
  getExh,
  getExhDetail,
  addExh,
  updateExh,
  deleteExh,
  linkArtToExh
);

export default exhReducer;
