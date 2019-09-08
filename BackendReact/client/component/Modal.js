import React from 'react';
import { connect } from 'react-redux';
import { deleteArtworkthunk } from '../reducer/artworks';

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
  position: 'relative',
  left: -50,
  width: 70,
  minHeight: 40,
  borderRadius: 5,
  backgroundColor: '#4FD0FF',
  color: '#FFFFFF'
};

const buttonStyle2 = {
  position: 'relative',
  left: 50,
  width: 70,
  minHeight: 40,
  borderRadius: 5,
  backgroundColor: '#B5B7B5',
  color: '#FFFFFF'
};

export class Modalcompo extends React.Component {
  constructor() {
    super();
    this.state = {
      message: false
    };
  }
  render() {
    if (!this.props.show) {
      return null;
    }

    if (this.state.message) {
      return (
        <div className='backdrop' style={greybackground}>
          <div className='modal' style={modalStyle}>
            <p>Artwork has been deleted!</p>
            <button
              style={{ ...buttonStyle1, left: 0 }}
              onClick={() => {
                this.props.confirm();
              }}
            >
              OK
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='backdrop' style={greybackground}>
        <div className='modal' style={modalStyle}>
          <p>Are you sure you wish to delete this artwork?</p>
          <button
            style={buttonStyle1}
            onClick={() => {
              this.props.cancel();
            }}
          >
            Cancel
          </button>

          <button
            style={buttonStyle2}
            onClick={() => {
              this.props.deleteArtwork(this.props.id);
              this.setState({ message: true });
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
