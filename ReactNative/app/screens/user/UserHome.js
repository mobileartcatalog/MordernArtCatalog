import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Dimensions, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../stylesheets/forms.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getArt } from '../../reducers/artReducer/getArt';
import { getExh } from '../../reducers/exhReducer/getExh';
import { logoutUser } from '../../reducers/authReducer/authUser';
import { StyledButton, StyledSecondaryButton } from '../formComponents';

class UserHome extends Component {
  componentDidMount() {
    const { loaded } = this.props;
    if (!loaded) {
      this.props.getArt();
      this.props.getExh();
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      art,
      artCount,
      exh,
      exhCount,
      authenticated,
      email,
      logoutUser
    } = this.props;
    console.log('user props', this.props);

    // if (authenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>User Home</Text>
        <Text style={styles.h1}>{email}</Text>

        <View style={styles.innerContainer}>
          <StyledSecondaryButton
            title={`Artwork  ${artCount}`}
            onPress={() => navigate('ArtworkList')}
          />
        </View>

        <View style={styles.innerContainer}>
          <StyledSecondaryButton
            title={`Exhibitions  ${exhCount}`}
            onPress={() => navigate('ExhList')}
          />
        </View>

        <StyledSecondaryButton title="Log out" onPress={() => logoutUser()} />
      </View>
    );
    // }
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    loaded: state.art.loaded,
    art: state.art.all,
    artCount: state.art.count,
    exh: state.exhibitions.all,
    exhCount: state.exhibitions.count
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  getExh: () => dispatch(getExh()),
  logoutUser: () => dispatch(logoutUser())
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(UserHome)
);
