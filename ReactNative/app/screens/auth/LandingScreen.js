import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../reducers/authReducer/authUser';
import UserHome from '../user/UserHome';
import LoginScreen from './LoginScreen';

class LandingScreen extends Component {
  componentDidMount() {
    this.props.getUser();
    console.log('landing props after componentDidMount getUser', this.props);
  }

  render() {
    return this.props.authenticated ? <UserHome /> : <LoginScreen />;
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatch = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(
  mapState,
  mapDispatch
)(LandingScreen);
