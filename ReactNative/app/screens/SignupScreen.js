import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/forms.js';
import * as Firebase from './firebase';

class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: '',
      loading: false,
      error: '',
      message: ''
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.saveUser = this.saveUser.bind(this);
    // this.signUpAndSave = this.signUpAndSave.bind(this);
  }

  // handleChange(name, text) {
  //   this.setState(() => ({ [name]: text }));
  // }

  handleSignUp() {
    const { email, password1 } = this.state;
    console.log(Firebase);
    this.setState({ loading: true });
    try {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password1)
        .then(() => {
          this.setState({
            message: 'you signed up',
            error: '',
            loading: false
          });
        });
    } catch (error) {
      this.setState({ error: 'Cannot authenticate', loading: false });
    }
  }

  // saveUser() {
  //   const { email } = this.state;
  //   firebase.firestore()
  //     .collection('users')
  //     .doc(email)
  //     .set({ name: this.state.name });
  // }

  // signUpAndSave() {
  //   this.saveUser();
  //   this.handleSignUp();
  // }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Input
          style={styles.field}
          autoCapitalize="none"
          placeholder={'email'}
          leftIcon={<Icon name="pencil" style={styles.icon} />}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          style={styles.field}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'password'}
          leftIcon={<Icon name="pencil" style={styles.icon} />}
          onChangeText={password1 => this.setState({ password1 })}
          value={this.state.password1}
        />

        <Input
          style={styles.field}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder={'re-enter password'}
          leftIcon={<Icon name="pencil" style={styles.icon} />}
          onChangeText={password2 => this.setState({ password2 })}
          value={this.state.password2}
        />

        <Button
          title="Sign up"
          onPress={this.handleSignUp}
          style={styles.button}
        />

        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

export default withNavigation(SignupScreen);
