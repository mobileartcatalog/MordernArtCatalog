/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import { fetchArtworks } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import AddArtwork from './Upload';

export class AllArtworks extends React.Component {
  componentDidMount() {
    this.props.setArtworks();
  }

  render() {
    const { artworks, loading } = this.props;
    if (loading) return <div>Loading</div>;

    return (
      <div>
        <div>
          <h2>All Artworks</h2>
          {artworks.map(artwork => (
            <div key={artwork._id}>
              <h4>{artwork.title}</h4>
              {!artwork.imageUrl && true ? (
                <img
                  src={`data: ${
                    artwork.img1.contentType
                  }; base64,${arrayBufferToBase64(artwork.img1.data.data)}`}
                  alt='image'
                  style={{ height: 400 }}
                />
              ) : (
                <img
                  src={artwork.imageUrl}
                  alt='image'
                  style={{ height: 400 }}
                />
              )}
            </div>
          ))}
        </div>
        <AddArtwork />
      </div>
    );
  }
}

const mapState = state => {
  return {
    artworks: state.artworks.all,
    loading: state.artworks.loading
  };
};

const mapDispatch = dispatch => {
  return {
    setArtworks: () => dispatch(fetchArtworks())
  };
};

export const Artworks = connect(
  mapState,
  mapDispatch
)(AllArtworks);
