import reduceReducers from 'reduce-reducers';

import getExh from './getExh';
import getExhDetail from './getExhDetail';
import addExh from './addExh'
import deleteExh from './deleteExh'

const initialState = {
  loading: false,
  loaded: false,
  all: [],
  selected: {},
  count: 0
};

const exhReducer = reduceReducers(initialState, getExh, getExhDetail, addExh, deleteExh);

export default exhReducer;
