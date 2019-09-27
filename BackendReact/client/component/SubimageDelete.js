import React from 'react';
import { connect } from 'react-redux';
import { deleteImagethunk } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';

class DeleteSubimageCompo extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handelCancel = this.handelCancel.bind(this);
  }

  handleDelete() {
    const imageId = this.props.match.params.imageId;
    const { selected } = this.props;
    this.props.deleteImage(imageId, selected._id);
    this.props.history.push(`/${selected._id}`);
  }

  handelCancel() {
    const { selected } = this.props;
    this.props.history.push(`/${selected._id}`);
  }

  render() {
    const { images, selected } = this.props;
    const imageIndex = this.props.location.imageIndex;
    const imageId = this.props.match.params.imageId;
    return (
      <div>
        <p>Delete this image? Are you sure?</p>
        <img
          src={`data: ${
            images[imageIndex].contentType
          }; base64,${arrayBufferToBase64(images[imageIndex].data.data)}`}
          alt='artsubimage'
        />
        <button type='button' onClick={this.handleDelete}>
          Delete
        </button>
        <button type='button' onClick={this.handelCancel}>
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
    deleteImage: (id, artworkId) => dispatch(deleteImagethunk(id, artworkId))
  };
};

export const DeleteSubimage = connect(
  mapState,
  mapDispatch
)(DeleteSubimageCompo);

//when dipatch thunk, pass in artworkId, and imageId
