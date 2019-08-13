import React, { Component } from 'react';
import { Dimensions, View, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from '../stylesheets/forms';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: ''
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>User Home Page</Text>

        <Button
          title="Artwork"
          onPress={() => navigate('ArtworkList')}
          style={styles.button}
        />
        <Button
          title="Exhibitions"
          onPress={() => navigate('ExhList')}
          style={styles.button}
        />
      </View>
    );
  }
}
