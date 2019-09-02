import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleArt } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import UploadImages from './UploadImages';

class ArtworkCompo extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.artworkId;
    this.props.setSingleArt(id);
  }

  render() {
    if (this.props.loading) return <div>Loading</div>;
    if (!this.props.selected.title) return <div>Loading</div>;
    const { title, date, medium, img1 } = this.props.selected;
    const { images } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        <img
          src={`data: ${img1.contentType}; base64,${arrayBufferToBase64(
            img1.data.data
          )}`}
          alt='artworkimage'
          height='700'
        />
        <h4>artisit</h4>
        <h4>Description</h4>
        <h4>Medium</h4>
        <p>{medium}</p>
        <h4>Dimensions</h4>
        {images.length ? (
          images.map(image => {
            return (
              <div key={image._id}>
                <img
                  src={`data: ${
                    image.contentType
                  }; base64,${arrayBufferToBase64(image.data.data)}`}
                  alt='image'
                  style={{ height: 100 }}
                />
              </div>
            );
          })
        ) : (
          <p>No images</p>
        )}
        <UploadImages />
      </div>
    );
  }
}

const mapState = state => {
  return {
    selected: state.artworks.selected,
    images: state.artworks.images,
    loading: state.artworks.loading
  };
};

const mapDispatch = dispatch => {
  return {
    setSingleArt: id => dispatch(fetchSingleArt(id))
  };
};

export const Artwork = connect(
  mapState,
  mapDispatch
)(ArtworkCompo);
