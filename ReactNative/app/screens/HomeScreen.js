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
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri:
              'http://hdwpro.com/wp-content/uploads/2017/03/Art-Background-Image-1024x768.png'
          }}
        >
          <Text style={styles.headlineText}>Mobile Art Catalog</Text>
          <Text style={styles.bodyText}>Welcome, {this.state.user}</Text>
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
        </ImageBackground>
      </View>
    );
  }
}
