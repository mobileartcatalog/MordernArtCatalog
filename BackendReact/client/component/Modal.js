import React from 'react';
import { connect } from 'react-redux';
import { deleteArtworkthunk } from '../reducer/artworks';

export class Modalcompo extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    //The gray background style
    const greybackground = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 50
    };

    //The modal "window"
    const modalStyle = {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      maxWidth: 300,
      minHeight: 150,
      margin: '0 auto',
      padding: 30
    };

    const buttonStyle1 = {
      // position: 'fixed',
      // top: 150,
      // left: 555,
      position: 'relative',
      maxWidth: 150,
      minHeight: 40,
      borderRadius: 5,
      backgroundColor: '#5F758E',
      color: '#FFFFFF'
    };

    const buttonStyle2 = {
      position: 'relative',
      // top: 150,
      left: 70,
      maxWidth: 600,
      minHeight: 40,
      borderRadius: 5,
      backgroundColor: '#5F758E',
      color: '#FFFFFF'
    };

    return (
      <div className='backdrop' style={greybackground}>
        <div className='modal' style={modalStyle}>
          <p>Are you sure you wish to delete this artwork?</p>
          <button
            style={buttonStyle1}
            onClick={() => {
              this.props.confirm();
            }}
          >
            Cancel
          </button>
          <button
            style={buttonStyle2}
            onClick={() => {
              this.props.deleteArtwork(this.props.id);
              this.props.confirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    deleteArtwork: id => dispatch(deleteArtworkthunk(id))
  };
};

export const Modal = connect(
  null,
  mapDispatch
)(Modalcompo);
