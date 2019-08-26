/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import { fetchArtworks } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import AddArtwork from './Upload';
import { Link } from 'react-router-dom';

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
              <Link to={`/${artwork._id}`}>
                <div>
                  <h4>{artwork.title}</h4>
                  {artwork.img1 && true ? (
                    <img
                      src={`data: ${
                        artwork.img1.contentType
                      }; base64,${arrayBufferToBase64(artwork.img1.data.data)}`}
                      alt='image'
                      style={{ height: 400 }}
                    />
                  ) : (
                    <img
                      src='defaultImage.png'
                      alt='image'
                      style={{ height: 400 }}
                    />
                  )}
                </div>
              </Link>
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
