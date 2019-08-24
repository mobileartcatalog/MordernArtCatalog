import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ExhList, ExhDetail } from '..';

class ExhHome extends Component {

  render() {
    // const { selected } = this.props;

    return this.props.selected ? <ExhDetail /> : <ExhList />;
  }
}

const mapState = state => {
  return {
    all: state.exhibitions.all,
    selected: state.exhibitions.selected
  };
};

const mapDispatch = dispatch => ({
  // getUser: () => dispatch(getUser())
});

export default connect(
  mapState,
  null
)(ExhHome);
