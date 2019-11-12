/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import { fetchArtworks } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import AddArtwork from './Upload';
// import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export class AllArtworks extends React.Component {
  componentDidMount() {
    this.props.setArtworks();
  }

  render() {
    const { artworks, loading } = this.props;
    if (loading) return <div>Loading</div>;

    return (
      <div className="page">
        <div className="page-header">
          <h3 className="page-title artwork">Artwork</h3>
          <div className="page-header-button-bar">
            <FiPlusCircle
              className="button"
              onClick={() => this.props.history.push('/artworks/new')}
            />
          </div>
        </div>

        <div className="artwork-container">
          {artworks.map(artwork => (
            <div className="artwork-item" key={artwork._id}>
              <Link to={`/artworks/${artwork._id}`}>
                {artwork.img1 && true ? (
                  <img
                    className="artwork-image"
                    src={`data: ${
                      artwork.img1.contentType
                    }; base64,${arrayBufferToBase64(artwork.img1.data.data)}`}
                    alt="image"
                  />
                ) : (
                  <img
                    className="artwork-image"
                    src="defaultImage.png"
                    alt="image"
                  />
                )}
                <div className="artwork-description">{artwork.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    artworks: state.artworks.all,
    loading: state.artworks.loading,
  };
};

const mapDispatch = dispatch => {
  return {
    setArtworks: () => dispatch(fetchArtworks()),
  };
};

export const Artworks = connect(
  mapState,
  mapDispatch
)(AllArtworks);
