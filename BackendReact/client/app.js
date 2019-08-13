import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Upload } from './component/Upload';
import { Artworks } from './component/AllArtworks';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <h1>Modern Art Catalog</h1>
      <Artworks />
    </div>
  </Provider>,
  document.getElementById('app')
);
