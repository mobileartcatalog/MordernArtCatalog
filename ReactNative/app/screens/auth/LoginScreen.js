import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Formik, Field } from 'formik';
import firebase from 'firebase';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/forms.js';


class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: '',
      message: '',
      keepLoggedIn: false
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
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Log in to your account</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
          >
            {props => (
              <View>
                <TextInput
                style={styles.inputContainer}
                  // containerStyle={styles.inputContainer}
                  // inputContainerStyle={styles.inputText}
                  autoCapitalize="none"
                  placeholder="email"
                  autoFocus
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
                <Input
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputText}
                  autoCapitalize="none"
                  placeholder="password"
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
                <Button
                  buttonStyle={styles.primaryButton}
                  onPress={props.handleSubmit}
                  title="Login"
                />
              </View>
            )}
          </Formik>

          {/* <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputText}
            autoCapitalize="none"
            placeholder="email"
            autoFocus
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputText}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          /> */}

          {/* <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxInput}
            checkedColor="black"
            uncheckedColor="gray"
            center
            title="Keep me logged in"
            onPress={() =>
              this.setState({ keepLoggedIn: !this.state.keepLoggedIn })
            }
            checked={this.state.keepLoggedIn}
          /> */}
          {/* <Button
            title="Log in"
            buttonStyle={styles.primaryButton}
            onPress={this.onLogin}
          /> */}
        </View>
        <View>
          <Button
            title="Create new account"
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.buttonText}
            onPress={() => navigate('Signup')}
          />
          <Button
            title="Log in with Google"
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.buttonText}
            icon={<Icon name="google" style={styles.icon} />}
            iconLeft
            // onPress={this.handleSignUp}
          />
          <Button
            title="Log in with Facebook"
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.buttonText}
            icon={<Icon name="facebook" style={styles.icon} />}
            iconLeft
            // onPress={this.handleSignUp}
          />
          <Button
            title="Forgot password?"
            buttonStyle={styles.secondaryButton}
            titleStyle={styles.buttonText}
            // onPress={() => navigate('HomeScreen')}
          />
        </View>
      </View>
    );
  }

  render() {
    return <View>{this.renderCurrentState()}</View>;
  }
}

export default withNavigation(LoginScreen);
