/* eslint-disable complexity */
/* eslint-disable react/button-has-type */
/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSingleArt,
  deleteArtworkthunk,
  setSubloadingFalseThunk,
} from '../reducer/artworks';
import { arrayBufferToBase64 } from '../../utils';
import UploadImages from './UploadImages';

import { AllArtworks } from './AllArtworks';
import { Modal } from './Modal';
import { Redirect, Link } from 'react-router-dom';
import { ModalEdit } from './ModalEdit';
import {
  FaTrashAlt,
  FaRegTrashAlt,
  FaEdit,
  FaBars,
  FaCheck,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import { FiEdit3, FiPlusCircle } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';

class ArtworkCompo extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      redirect: false,
      isEdit: false,
      imgIndex: 0,
    };
    this.handleComfirm = this.handleComfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditclick = this.handleEditclick.bind(this);
    this.handleEditComfirm = this.handleEditComfirm.bind(this);
    this.imgClick = this.imgClick.bind(this);
    this.handleRClick = this.handleRClick.bind(this);
    this.handleLClick = this.handleLClick.bind(this);
  }
  componentDidMount() {
    const { subloading, setSubloadingFalse, setSingleArt } = this.props;
    const id = this.props.match.params.artworkId;
    subloading ? setSubloadingFalse() : setSingleArt(id);
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

  render() {
    if (this.props.loading) return <div>Loading</div>;
    if (this.props.subloading) return <div>Loading</div>;
    if (!this.props.selected.title) return <div>Loading</div>;
    if (this.state.imgData === '') return <div>Loading</div>;
    const {
      title,
      height,
      width,
      depth,
      description,
      medium,
      img1,
      _id,
    } = this.props.selected;
    console.log('in the art compo', this.props.selected);
    const { images } = this.props;
    console.log('images from fetch single', images);

    if (this.state.redirect) return <Redirect to="/artworks" />;

    return (
      <div className="page">
        <div className="page-header">
          <h3 className="page-title artwork">{this.props.selected.title}</h3>
          <div className="page-header-button-bar">
            <FiEdit3 className="button" onClick={this.handleEditclick} />
            <FaRegTrashAlt className="button" onClick={this.handleDelete} />
            <FiPlusCircle
              className="button"
              onClick={() => this.props.history.push('/artworks/new')}
            />
          </div>
        </div>
        <div className="detail-container">
          <div className="main-content">
            {img1 || images.length > 0 ? (
              <div className="image-container">
                <img
                  className="artwork-detail-image"
                  src={`data: ${
                    images[this.state.imgIndex].contentType
                  }; base64,${arrayBufferToBase64(
                    images[this.state.imgIndex].data.data
                  )}`}
                  alt={`image of ${title}`}
                />
                <Link
                  to={{
                    pathname: `/images/${images[this.state.imgIndex]._id}`,
                    imageIndex: this.state.imgIndex,
                  }}
                >
                  <FaEdit className="faedit" />
                </Link>
                <FaChevronRight
                  className="faright"
                  onClick={this.handleRClick}
                />
                <FaChevronLeft className="faleft" onClick={this.handleLClick} />

                <div className="artwork-detail-subimages">
                  {images.length
                    ? images.map((image, index) => {
                        return (
                          <div key={image._id} className="singleimagecontainer">
                            <img
                              className="singleimage"
                              src={`data: ${
                                image.contentType
                              }; base64,${arrayBufferToBase64(
                                image.data.data
                              )}`}
                              alt="image"
                              onClick={() => this.imgClick(index)}
                            />
                            {/* ??render check a little slow,even add subloading */}
                            {img1.id === image._id ? (
                              <FaCheck className="facheck" />
                            ) : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}

            <div className="artwork-detail-description">
              <ModalEdit
                show={this.state.isEdit}
                confirm={this.handleEditComfirm}
              />
              <h4>{title}</h4>
              {/* <p>{date}</p> */}
              <p>{medium}</p>
              {height && width ? (
                <p>
                  {height.$numberDecimal} x {width.$numberDecimal} in. (
                  {height.$numberDecimal * Math.round(2.54, 1)} x
                  {width.$numberDecimal * Math.round(2.54, 1)} cm)
                </p>
              ) : (
                <p>[None]</p>
              )}
              <div className="upload">
                <UploadImages />
              </div>

              <Modal
                show={this.state.isOpen}
                cancel={this.handleCancel}
                confirm={this.handleComfirm}
              />
            </div>
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
    loading: state.artworks.loading,
    subloading: state.artworks.subloading,
  };
};

const mapDispatch = dispatch => {
  return {
    setSingleArt: id => dispatch(fetchSingleArt(id)),
    deleteArtwork: id => dispatch(deleteArtworkthunk(id)),
    setSubloadingFalse: () => dispatch(setSubloadingFalseThunk()),
  };
};

export const Artwork = connect(
  mapState,
  mapDispatch
)(ArtworkCompo);
