import React from 'react';
import { connect } from 'react-redux';
import { fetchArtworks } from '../reducer/artworks';

export class AllArtworks extends React.Component {
  componentDidMount() {
    this.props.setArtworks();
  }

  render() {
    const { artworks, loading } = this.props;
    if (loading) return <div>Loading</div>;
    return (
      <div>
        <div>
          <h2>All Artworks</h2>
          {artworks.map(artwork => (
            <div key={artwork._id}>
              <h4>{artwork.title}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    artworks: state.artworks.all,
    loading: state.artworks.loading
  };
};

const mapDispatch = dispatch => {
  return {
    setArtworks: () => dispatch(fetchArtworks())
  };
};

export const Artworks = connect(
  mapState,
  mapDispatch
)(AllArtworks);
