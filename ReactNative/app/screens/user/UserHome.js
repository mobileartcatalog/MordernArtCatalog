import React, { Component } from 'react';
import { Dimensions, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../stylesheets/forms';
import { getArt } from '../../reducers/artReducer/getArt';
import { getExh } from '../../reducers/exhReducer/getExh';

export default class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
   //getart
   //getexh
  }

  render() {
    const { navigate } = this.props.navigation;
    const { width, height } = Dimensions.get('window');

    this.props.authenticated ? (
    return (
      <View style={styles.container}>
          <Text style={styles.headlineText}>User Home</Text>
      </View>)
    );
  }
}

const mapState = state => {
  return {
    authenticated = state.auth.authenticated
  }
}

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  getExh: () => dispatch(getExh()),
})

export default connect(mapState, mapDispatch)(UserHome)