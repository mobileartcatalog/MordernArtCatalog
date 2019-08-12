import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      // `withExtraArgument` gives us access to axios in our async action creators!
      // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
      thunkMiddleware.withExtraArgument({ axios }),
      loggingMiddleware
    )
  )
);

export default store;
