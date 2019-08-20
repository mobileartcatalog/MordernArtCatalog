import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import art from './reducers/artReducer/';
import exhibitions from './reducers/exhReducer';
import auth from './reducers/authReducer';

const rootReducer = combineReducers({ art, exhibitions, auth });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
