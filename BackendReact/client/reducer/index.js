import { combineReducers } from 'redux';
import artworksReducer from './artworks';

const rootReducer = combineReducers({
  artworks: artworksReducer
});

export default rootReducer;
