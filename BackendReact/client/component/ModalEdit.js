import React from 'react';
import { connect } from 'react-redux';
import { updateArtInfo } from '../reducer/artworks';

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
  maxWidth: 500,
  minHeight: 350,
  margin: '0 auto',
  padding: 30
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
      title: '',
      date: '',
      medium: '',
      height: '',
      width: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const currentState = this.state;
    const payload = {};
    for (let key in currentState) {
      if (currentState[key] !== '') {
        payload[key] = currentState[key];
      }
    }
    this.props.updateArt(this.props.selected._id, payload);
    this.props.confirm();
  }

  render() {
    const { title, medium, date, height, width } = this.props.selected;

    if (!this.props.show) {
      return null;
    }
    return (
      <div className='backdrop' style={greybackground}>
        <div className='modal' style={modalStyle}>
          <h4>Update Artwork Infomation</h4>
          <form className='updateform' onSubmit={this.handleSubmit}>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              value={this.state.title}
              placeholder={title}
              onChange={this.handleChange}
            />
            <label htmlFor='date'>Date:</label>
            <input
              type='text'
              name='date'
              value={this.state.date}
              placeholder={date}
              onChange={this.handleChange}
            />
            <label htmlFor='medium'>Medium:</label>
            <input
              type='text'
              name='medium'
              value={this.state.medium}
              placeholder={medium}
              onChange={this.handleChange}
            />
            <label htmlFor='height'>Height:</label>
            <input
              type='text'
              name='height'
              value={this.state.height}
              placeholder={height ? height.$numberDecimal : 'none'}
              onChange={this.handleChange}
            />
            <label htmlFor='width'>Width:</label>
            <input
              type='text'
              name='width'
              value={this.state.width}
              placeholder={width ? width.$numberDecimal : 'none'}
              onChange={this.handleChange}
            />
            <button type='submit' style={buttonStyle2}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    selected: state.artworks.selected
  };
};

const mapDispatch = dispatch => {
  return {
    updateArt: (id, data) => dispatch(updateArtInfo(id, data))
  };
};

export const ModalEdit = connect(
  mapState,
  mapDispatch
)(Modalcompo);
