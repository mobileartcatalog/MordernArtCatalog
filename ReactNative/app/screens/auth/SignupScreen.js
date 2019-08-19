import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
// import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/forms.js';
import {
  StyledInput,
  StyledSwitch,
  StyledButton,
  StyledSecondaryButton
} from '../formComponents';
import authValidationSchema from './validationSchema';
import { signupUser } from '../../reducers/authReducer';

class SignupScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    console.log('this.props', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Create a new account</Text>

          <Formik
            initialValues={{
              name: '',
              password: '',
              confirmPassword: '',
              stayLoggedIn: false
            }}
            onSubmit={values => {
              this.props.signupUser(values.email, values.password);
            }}
            validationSchema={authValidationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'email'}
                  placeholder="email"
                  autoFocus
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'password'}
                  placeholder={'password'}
                  secureTextEntry
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'confirmPassword'}
                  placeholder={'confirm password'}
                  secureTextEntry
                />

                {/* <View style={styles.horizontalLabel}>
                  <Text style={styles.formLabel}>Keep me logged in</Text>
                  <StyledSwitch
                    formikKey="stayLoggedIn"
                    formikProps={formikProps}
                  />
                </View> */}
                <StyledButton
                  title="Create account"
                  onPress={formikProps.handleSubmit}
                />
                <Text style={styles.errorMessage}>
                  {formikProps.errors.general}
                </Text>
              </React.Fragment>
            )}
          </Formik>
        </View>
        <View>
          <StyledSecondaryButton
            title="Login"
            onPress={() => navigate('Login')}
          />
          <StyledSecondaryButton
            title="Log in with Google"
            icon={<Icon name="google" style={styles.icon} />}
            iconLeft
            // onPress={}
          />
          <StyledSecondaryButton
            title="Log in with Facebook"
            icon={<Icon name="facebook" style={styles.icon} />}
            iconLeft
            // onPress={}
          />
          <StyledSecondaryButton
            title="Forgot password?"
            // onPress={() => navigate('HomeScreen')}
          />
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

const mapDispatch = dispatch => ({
  signupUser: (email, password) => dispatch(signupUser(email, password))
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(SignupScreen)
);
