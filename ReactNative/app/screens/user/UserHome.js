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
    return (
      <View style={styles.container}>
        
          <Text style={styles.headlineText}>User Home</Text>
          <Text style={styles.bodyText}>Welcome, {this.state.user.firstName}</Text>
          <Button
            title="Login"
            onPress={() => navigate('Login')}
            style={styles.button}
          />
          <Button
            title="Signup"
            onPress={() => navigate('Signup')}
            style={styles.button}
          />
    
      </View>
    );
  }
}

const mapState = state => {
  return {
    artLoaded: state.art.loaded,
    art: state.art.all,
    artCount: state.art.artCount,
    exhLoaded: state.exhibitions.loaded,
    exhibitions = state.exhibitions.all,
    exhCount = state.exhibitions.exhCount,
    user = state.user.user
  }
}

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  getExh: () => dispatch(getExh()),
})

export default connect(mapState, mapDispatch)(UserHome)