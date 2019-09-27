import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Artworks } from './AllArtworks';
import { Exhibitions } from './Exhibitions';
import { Artwork } from './Artwork';
import { DeleteSubimage } from './SubimageDelete';

export const Root = () => {
  return (
    <div>
      <nav>
        Welcome!
        <Link to='/'>Artworks</Link>
        <Link to='/exhibitions'>Exhibitions</Link>
      </nav>
      <main>
        <div>
          <h1>Modern Art Catalog</h1>
        </div>
      </main>
      <Switch>
        <Route exact path='/exhibitions' component={Exhibitions} />
        <Route exact path='/:artworkId' component={Artwork} />
        <Route exact path='/' component={Artworks} />
        <Route exact path='/images/:imageId' component={DeleteSubimage} />
      </Switch>
    </div>
  );
};
