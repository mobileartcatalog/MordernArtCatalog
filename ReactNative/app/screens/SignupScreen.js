import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/forms.js';

class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      loading: false,
      error: ''
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.signUpAndSave = this.signUpAndSave.bind(this);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.form}>
        <Input
          placeholder={`What's your name?`}
          label={'Your name'}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <Input
          placeholder={'Enter your email'}
          label={'Email'}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder={'Enter your password'}
          label={'Password'}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableHighlight
          style={styles.buttons}
          onPress={this.signUpAndSave}
          underlayColor="#04152b"
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          // onPress={() => this.props.history.push('/')}
          underlayColor="#04152b"
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default withNavigation(SignupScreen);