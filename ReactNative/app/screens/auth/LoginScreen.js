import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/forms.js';
import {
  StyledInput,
  StyledSwitch,
  StyledButton,
  StyledSecondaryButton
} from '../formComponents';
import { loginValidationSchema } from './validationSchema';
import { loginUser } from '../../reducers/authReducer/authUser';

class LoginScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Log in to your account</Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
              stayLoggedIn: false
            }}
            onSubmit={(values, actions) => {
              this.props
                .loginUser(values.email, values.password, values.stayLoggedIn)
                .catch(error => {
                  actions.setFieldError('general', error.message);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
            validationSchema={loginValidationSchema}
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

                <View style={styles.horizontalLabel}>
                  <Text style={styles.formLabel}>Keep me logged in</Text>
                  <StyledSwitch
                    formikKey="stayLoggedIn"
                    formikProps={formikProps}
                  />
                </View>

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <React.Fragment>
                    <StyledButton
                      title="Login"
                      onPress={formikProps.handleSubmit}
                    />
                    {!this.props.email ? (
                      <Text style={styles.errorMessage}>
                        {this.props.error}
                      </Text>
                    ) : (
                      <Text style={styles.errorMessage}>
                        {`welcome, ${this.props.uid}`}
                      </Text>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </Formik>
        </View>
        <View>
          <StyledSecondaryButton
            title="Create new account"
            onPress={() => navigate('Signup')}
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
    error: state.auth.error,
    email: state.auth.email,
    uid: state.auth.uid
  };
};

const mapDispatch = dispatch => ({
  loginUser: (email, password, stayLoggedIn) =>
    dispatch(loginUser(email, password, stayLoggedIn))
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(LoginScreen)
);
