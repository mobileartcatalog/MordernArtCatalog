import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/forms.js';
import {
  StyledInput,
  StyledButton,
  StyledSecondaryButton
} from '../formComponents';
import signupValidationSchema from './validationSchema';
import { signupUser } from '../../reducers/authReducer/authUser';
import * as firebase from '../firebase';

class SignupScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Create a new account</Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: ''
            }}
            onSubmit={async (values, actions) => {
              // this.props
              //   .signupUser(values.email, values.password)
              //   .then(() => {
              //     actions.setFieldError('general', 'success!');
              //     actions.setSubmitting(false);
              //     this.props.navigation.navigate('Home');
              //   })
              //   .catch(error => {
              //     actions.setFieldError('general', error.message);
              //   })
              //   .finally(() => {
              //     // actions.setSubmitting(false);
              //     // this.props.navigation.navigate('Home');
              //   });
              try {
                await this.props.signupUser(values.email, values.password);

                alert('submitting!!');
                actions.setFieldError('general', 'success!');
                actions.setSubmitting(false);
                this.props.navigation.navigate('Home');
              } catch (err) {
                actions.setFieldError('general', err.message);
              }
            }}
            validationSchema={signupValidationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'email'}
                  placeholder='email'
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

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <React.Fragment>
                    <StyledButton
                      title='Create account'
                      onPress={formikProps.handleSubmit}
                    />
                    <Text style={styles.errorMessage}>{this.props.error}</Text>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </Formik>
        </View>
        <View>
          <StyledSecondaryButton
            title='Login'
            onPress={() => navigate('Login')}
          />
          <StyledSecondaryButton
            title='Sign up with Google'
            icon={<Icon name='google' style={styles.icon} />}
            iconLeft
            // onPress={}
          />
          <StyledSecondaryButton
            title='Sign up with Facebook'
            icon={<Icon name='facebook' style={styles.icon} />}
            iconLeft
            // onPress={}
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
