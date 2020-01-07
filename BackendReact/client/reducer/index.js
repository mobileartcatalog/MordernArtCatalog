import { combineReducers } from 'redux';
import artworksReducer from './artworks';
import authReducer from './auth';

const rootReducer = combineReducers({
  artworks: artworksReducer,
  auth: authReducer,
});

export default rootReducer;
