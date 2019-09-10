/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleArt, deleteArtworkthunk } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import UploadImages from './UploadImages';
import { Modal } from './Modal';
import { Redirect } from 'react-router-dom';
import { ModalEdit } from './ModalEdit';

class ArtworkCompo extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      redirect: false,
      isEdit: false
    };
    this.handleComfirm = this.handleComfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditclick = this.handleEditclick.bind(this);
    this.handleEditComfirm = this.handleEditComfirm.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.artworkId;
    this.props.setSingleArt(id);
  }

  handleCancel() {
    this.setState({ isOpen: false });
  }

  handleComfirm() {
    this.setState({ isOpen: false, redirect: true });
  }

  handleDelete() {
    this.setState({
      isOpen: true
    });
  }

  handleEditclick() {
    this.setState({ isEdit: true });
  }

  handleEditComfirm() {
    this.setState({ isEdit: false });
  }
  render() {
    if (this.props.loading) return <div>Loading</div>;
    if (!this.props.selected.title) return <div>Loading</div>;
    const { title, date, medium, img1, _id } = this.props.selected;
    const { images } = this.props;

    if (this.state.redirect) return <Redirect to='/' />;

    return (
      <div className='artwork'>
        <div className='artworkInfo'>
          <div className='imgContainer'>
            <img
              src={`data: ${img1.contentType}; base64,${arrayBufferToBase64(
                img1.data.data
              )}`}
              alt='artworkimage'
            />
          </div>
          <div className='artwork-detail'>
            <h3>{title}</h3>
            <button onClick={this.handleEditclick}>Edit</button>
            <ModalEdit
              show={this.state.isEdit}
              confirm={this.handleEditComfirm}
            />
            <h4>artisit</h4>
            <p>[artisit]</p>
            <h4>Description</h4>
            <p>[note]</p>
            <h4>Medium</h4>
            <p>{medium}</p>
            <h4>Dimensions</h4>
            <p>XXinches ** YYinches</p>
            <div className='upload'>
              <UploadImages />
            </div>
            <button id='deleteartwork' onClick={this.handleDelete}>
              Delete this artwork
            </button>
            <Modal
              show={this.state.isOpen}
              cancel={this.handleCancel}
              confirm={this.handleComfirm}
            />
          </div>
        </div>
        <div className='subimages'>
          <div className='images'>
            {images.length
              ? images.map(image => {
                  return (
                    <div key={image._id}>
                      <img
                        src={`data: ${
                          image.contentType
                        }; base64,${arrayBufferToBase64(image.data.data)}`}
                        alt='image'
                        style={{ height: 100, width: 100 }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
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
    setSingleArt: id => dispatch(fetchSingleArt(id)),
    deleteArtwork: id => dispatch(deleteArtworkthunk(id))
  };
};

export const Artwork = connect(
  mapState,
  mapDispatch
)(ArtworkCompo);
