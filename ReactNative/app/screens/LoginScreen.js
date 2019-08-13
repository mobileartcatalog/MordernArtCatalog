import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/forms.js';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  };
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: '',
      message: ''
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log(res.user.email);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  renderCurrentState() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View>
        <Input
          style={styles.field}
          autoCapitalize="none"
          placeholder="email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          leftIcon={<Icon name="pencil" style={styles.icon} />}
        />
        <Input
          style={styles.field}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          leftIcon={<Icon name="pencil" style={styles.icon} />}
        />

        <Button title="Login" onPress={this.onLogin} style={styles.button} />
        <Button
          title="Sign in with Google"
          // onPress={this.handleSignUp}
          style={styles.button}
        />
        <Button
          title="Sign in with Facebook"
          // onPress={this.handleSignUp}
          style={styles.button}
        />
        <Button
          title="Forgot password?"
          // onPress={() => navigate('HomeScreen')}
          style={styles.button}
        />
      </View>
    );
  }

  render() {
    return <View>{this.renderCurrentState()}</View>;
  }
}

export default withNavigation(LoginScreen);
