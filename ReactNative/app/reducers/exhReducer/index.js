import reduceReducers from 'reduce-reducers';

import getExh from './getExh';
import getExhDetail from './getExhDetail';

const initialState = {
  loading: false,
  loaded: false,
  all: [],
  selected: {},
  count: 0
};

const exhReducer = reduceReducers(initialState, getExh, getExhDetail);

export default exhReducer;
