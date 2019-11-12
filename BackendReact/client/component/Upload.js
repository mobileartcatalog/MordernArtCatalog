/* eslint-disable jsx-quotes */
import React from 'react';
import { connect } from 'react-redux';
import { addArtworkThunk } from '../reducer/artworks';
import { IoIosAddCircleOutline } from 'react-icons/io';

class AddArtwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      medium: '',
      description: '',
      height: '',
      width: '',
      depth: '',
      img1: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  fileSelectedHandler(event) {
    console.log('in fileSelect event', event.target.files[0]);
    this.setState({
      img1: event.target.files[0],
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
      description: '',
      height: '',
      width: '',
      depth: '',
      img1: null,
    });
  }
  render() {
    return (
      <div className="page">
        <div className="page-header">
          <h3 className="page-title">Add Artwork</h3>
        </div>

        <form className="artwork-form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              require="true"
              autoFocus="true"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="medium">Medium</label>
            <input
              type="text"
              name="medium"
              value={this.state.medium}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <div className="form-row">
              <label htmlFor="height">Dimensions</label>
              <input
                type="text"
                name="height"
                value={this.state.height}
                onChange={this.handleChange}
                placeholder="height (in.)"
              />
              {/* <label htmlFor="width">Width</label> */}

              <input
                type="text"
                name="width"
                placeholder="width (in.)"
                value={this.state.width}
                onChange={this.handleChange}
              />
              {/* <label htmlFor="depth">Depth</label> */}
              <input
                type="text"
                name="depth"
                placeholder="depth (in.)"
                value={this.state.depth}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-row textarea">
              <label htmlFor="description">Description</label>
              <input
                type="textarea"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <input
              type="file"
              name="img1"
              onChange={this.fileSelectedHandler}
            />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addArtwork: artwork => dispatch(addArtworkThunk(artwork)),
});

export default connect(
  null,
  mapDispatch
)(AddArtwork);
