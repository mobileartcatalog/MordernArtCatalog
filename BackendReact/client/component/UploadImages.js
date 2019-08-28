/* eslint-disable jsx-quotes */

import React from 'react';
import { connect } from 'react-redux';
import { updateArtThunk } from '../reducer/artworks';

class UploadImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkpics: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler(event) {
    console.log('in fileSelect event', event.target.files);
    this.setState({
      artworkpics: Array.from(event.target.files)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateArt(this.props.selected._id, this.state.artworkpics);
    this.setState({
      artworkpics: null
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='artworkpics'>Choose more images to upload</label>
          <input
            type='file'
            name='artworkpics'
            accept='.jpg, .jpeg, .png'
            multiple
            onChange={this.fileSelectedHandler}
          />
          <button type='submit'>Upload</button>
        </form>
        {/* <div className='artworkpics'>
          {this.state.artworkpics && (
          <img />)}
        </div> */}
      </div>
    );
  }
}

const mapState = state => {
  return {
    selected: state.artworks.selected
  };
};
const mapDispatch = dispatch => ({
  updateArt: (id, data) => dispatch(updateArtThunk(id, data))
});

export default connect(
  mapState,
  mapDispatch
)(UploadImages);
