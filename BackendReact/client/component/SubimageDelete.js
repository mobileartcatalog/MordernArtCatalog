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
    console.log('in images page', selected);
    const buttonOption = imageId === selected.img1.id;
    return (
      <div>
        <p>Delete this image? Are you sure?</p>
        {buttonOption ? <p>Main Image can't be delete.</p> : null}
        {!images[imageIndex] ? (
          <Text>Loading</Text>
        ) : (
          <img
            src={`data: ${
              images[imageIndex].contentType
            }; base64,${arrayBufferToBase64(images[imageIndex].data.data)}`}
            alt="artsubimage"
          />
        )}
        <button
          type="button"
          disabled={buttonOption}
          onClick={() => {
            changeMain(imageId, selected._id);
            history.push(`/artworks/${selected._id}`);
          }}
        >
          Set to Main Image
        </button>
        <button
          type="button"
          disabled={buttonOption}
          onClick={async () => {
            await deleteImage(imageId, selected._id);
            history.push(`/artworks/${selected._id}`);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => history.push(`/artworks/${selected._id}`)}
        >
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
    loading: state.artworks.loading,
  };
};

const mapDispatch = dispatch => {
  return {
    deleteImage: (id, artworkId) => dispatch(deleteImagethunk(id, artworkId)),
    changeMain: (id, artworkId) =>
      dispatch(changeMainimagethunk(id, artworkId)),
  };
};

export const DeleteSubimage = connect(
  mapState,
  mapDispatch
)(DeleteSubimageCompo);
