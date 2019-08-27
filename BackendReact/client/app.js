import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './component/Root';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('app')
);
