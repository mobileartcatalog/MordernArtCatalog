import reduceReducers from 'reduce-reducers';
import editArtwork from './editArtwork';
import getArt from './getArt';
import getArtworkDetail from './getArtworkDetail';
import addArtwork from './addArtwork';
import deleteArtwork from './deleteArtwork';
import updateArtwork from './updateArtwork';

const initialState = {
  loading: false,
  loaded: false,
  all: [],
  selected: {},
  images: [],
  count: 0,
};

const artReducer = reduceReducers(
  initialState,
  editArtwork,
  getArt,
  getArtworkDetail,
  addArtwork,
  deleteArtwork,
  updateArtwork
);

export default artReducer;
