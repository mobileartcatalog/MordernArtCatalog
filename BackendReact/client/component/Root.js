import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Artworks } from './AllArtworks';
import { Exhibitions } from './Exhibitions';
import { Artwork } from './Artwork';
import { Home } from './Home';
import AddArtwork from './Upload';
import { DeleteSubimage } from './SubimageDelete';

export const Root = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">Art Catalog</Link>
        </div>
        <div className="nav-menu">
          <div className="nav-button">
            <Link to="/artworks">Artworks</Link>
          </div>
          <div className="nav-button">
            <Link to="/exhibitions">Exhibitions</Link>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/exhibitions" component={Exhibitions} />
        <Route exact path="/artworks" component={Artworks} />
        <Route exact path="/artworks/new" component={AddArtwork} />
        <Route exact path="/artworks/:artworkId" component={Artwork} />
        <Route exact path="/images/:imageId" component={DeleteSubimage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
