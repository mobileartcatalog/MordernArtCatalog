import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './component/Root';
import Firebase, { FirebaseContext } from '../firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('app')
);
