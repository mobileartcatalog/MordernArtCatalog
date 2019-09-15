/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import { addArtworkThunk } from '../reducer/artworks';

class AddArtwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      medium: '',
      height: '',
      width: '',
      img1: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  fileSelectedHandler(event) {
    console.log('in fileSelect event', event.target.files[0]);
    this.setState({
      img1: event.target.files[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { title, date, medium, dimension, img1 } = this.state;
    this.props.addArtwork(this.state);
    this.setState({
      title: '',
      date: '',
      medium: '',
      height: '',
      width: '',
      img1: null
    });
  }
  render() {
    return (
      <div>
        <h2>Add Artwork</h2>
        <form className='addartworkform' onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            name='title'
            require='true'
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor='date'>Date:</label>
          <input
            type='text'
            name='date'
            value={this.state.date}
            onChange={this.handleChange}
          />

          <label htmlFor='medium'>Medium:</label>
          <input
            type='text'
            name='medium'
            value={this.state.medium}
            onChange={this.handleChange}
          />
          <div>
            <span>Dimension:</span>
            <label htmlFor='height'>Height</label>
            <input
              type='text'
              name='height'
              value={this.state.height}
              onChange={this.handleChange}
            />
            <span>inches </span>

            <label htmlFor='width'>Width</label>
            <input
              type='text'
              name='width'
              value={this.state.width}
              onChange={this.handleChange}
            />
            <span>inches</span>
          </div>

          <input type='file' name='img1' onChange={this.fileSelectedHandler} />

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addArtwork: artwork => dispatch(addArtworkThunk(artwork))
});

export default connect(
  null,
  mapDispatch
)(AddArtwork);
