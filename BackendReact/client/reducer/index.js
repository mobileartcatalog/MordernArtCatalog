import { combineReducers } from 'redux';
import artworks from './artworks';

const rootReducer = combineReducers({
  artworks: artworks
});

export default rootReducer;
