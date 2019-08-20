/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export default class AddArtwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      medium: '',
      dimension: '',
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
    const { title, date, medium, dimension, img1 } = this.state;
    const fd = new FormData();
    fd.append('img1', img1);
    fd.append('title', title);
    fd.append('date', date);
    fd.append('medium', medium);
    fd.append('dimension', dimension);
    axios
      .post('http://localhost:3000/api/artworks', fd)
      .then(res => console.log(res));
    this.setState({
      title: '',
      date: '',
      medium: '',
      dimension: ''
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

          <label htmlFor='dimension'>Dimension:</label>
          <input
            type='text'
            name='dimension'
            value={this.state.dimension}
            onChange={this.handleChange}
          />

          <input type='file' name='img1' onChange={this.fileSelectedHandler} />

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}
