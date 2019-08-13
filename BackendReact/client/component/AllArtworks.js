import React from 'react';
import { connect } from 'react-redux';
import { fetchArtworks } from '../reducer/artworks';

//utility funcion -- convert image data from array format to string format
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

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
                />
              ) : (
                <img src={artwork.imageUrl} alt='image' />
              )}
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
