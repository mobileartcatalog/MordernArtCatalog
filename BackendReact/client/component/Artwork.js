/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleArt, deleteArtworkthunk } from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import UploadImages from './UploadImages';
import { Modal } from './Modal';
import { Redirect, Link } from 'react-router-dom';
import { ModalEdit } from './ModalEdit';
import { DeleteSubimage } from './SubimageDelete';
import {
  FaTrashAlt,
  FaEdit,
  FaBars,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';

class ArtworkCompo extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      redirect: false,
      isEdit: false,
      imgIndex: 0
    };
    this.handleComfirm = this.handleComfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditclick = this.handleEditclick.bind(this);
    this.handleEditComfirm = this.handleEditComfirm.bind(this);
    this.imgClick = this.imgClick.bind(this);
    this.handleRClick = this.handleRClick.bind(this);
    this.handleLClick = this.handleLClick.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
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
    this.setState({ isOpen: true });
  }

  handleEditclick() {
    this.setState({ isEdit: true });
  }

  handleEditComfirm() {
    this.setState({ isEdit: false });
  }

  imgClick(index) {
    this.setState({ imgIndex: index });
  }

  handleRClick() {
    const { images } = this.props;
    let index =
      this.state.imgIndex === images.length - 1 ? 0 : this.state.imgIndex + 1;
    this.setState({ imgIndex: index });
  }

  handleLClick() {
    const { images } = this.props;
    let index =
      this.state.imgIndex === 0 ? images.length - 1 : this.state.imgIndex - 1;
    this.setState({ imgIndex: index });
  }

  handleTrash() {
    const { images } = this.props;
    console.log('images array', images);
    if (this.state.imgIndex === 0) {
      //image[0] === img1
      console.log('images[0]', images[0]);
      //call thunk , update the artwork.img1 with images[1], create a new image doc if no such doc(check images[0]._id if in the images collection)
    } else {
      //any image in images array
    }
  }

  render() {
    if (this.props.loading) return <div>Loading</div>;
    if (!this.props.selected.title) return <div>Loading</div>;
    if (this.state.imgData === '') return <div>Loading</div>;
    const { title, height, width, medium, img1, _id } = this.props.selected;
    console.log('in the art compo', this.props.selected);
    const { images } = this.props;
    console.log('images from fetch single', images);

    if (this.state.redirect) return <Redirect to='/' />;

    return (
      <div className='artwork'>
        <div className='artworkInfo'>
          <div className='imgContainer'>
            <img
              src={`data: ${
                images[this.state.imgIndex].contentType
              }; base64,${arrayBufferToBase64(
                images[this.state.imgIndex].data.data
              )}`}
              alt='artworkimage'
            />
            <Link
              to={{
                pathname: `/images/${images[this.state.imgIndex]._id}`,
                imageIndex: this.state.imgIndex
              }}
            >
              <FaTrashAlt className='fatrash' onClick={this.handleTrash} />
            </Link>
            <FaChevronRight className='faright' onClick={this.handleRClick} />
            <FaChevronLeft className='faleft' onClick={this.handleLClick} />
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
            {height && width ? (
              <p>
                {height.$numberDecimal}inches * {width.$numberDecimal}inches
              </p>
            ) : (
              <p>[None]</p>
            )}
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
              ? images.map((image, index) => {
                  return (
                    <div key={image._id}>
                      <img
                        className='singleimage'
                        src={`data: ${
                          image.contentType
                        }; base64,${arrayBufferToBase64(image.data.data)}`}
                        alt='image'
                        onClick={() => this.imgClick(index)}
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
