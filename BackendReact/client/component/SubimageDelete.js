import React from 'react';
import { connect } from 'react-redux';
import { deleteImagethunk, changeMainimagethunk } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';

class DeleteSubimageCompo extends React.Component {
  render() {
    const { images, selected, changeMain, deleteImage, history } = this.props;
    const imageIndex = this.props.location.imageIndex;
    const imageId = this.props.match.params.imageId;
    // check if imageId == selected._id, if yes => main image, fixed ,cannot delete, need to change ,pop up message modal or button delete validation
    return (
      <div>
        <p>Delete this image? Are you sure?</p>
        <img
          src={`data: ${
            images[imageIndex].contentType
          }; base64,${arrayBufferToBase64(images[imageIndex].data.data)}`}
          alt='artsubimage'
        />
        <button
          type='button'
          onClick={() => {
            changeMain(imageId, selected._id);
            history.push(`/${selected._id}`);
          }}
        >
          Set to Main Image
        </button>
        <button
          type='button'
          onClick={() => {
            deleteImage(imageId, selected._id);
            history.push(`/${selected._id}`);
          }}
        >
          Delete
        </button>
        <button type='button' onClick={() => history.push(`/${selected._id}`)}>
          Cancel
        </button>
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
    deleteImage: (id, artworkId) => dispatch(deleteImagethunk(id, artworkId)),
    changeMain: (id, artworkId) => dispatch(changeMainimagethunk(id, artworkId))
  };
};

export const DeleteSubimage = connect(
  mapState,
  mapDispatch
)(DeleteSubimageCompo);
