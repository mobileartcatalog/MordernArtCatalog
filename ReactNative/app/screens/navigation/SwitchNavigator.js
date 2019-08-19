import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import { LandingScreen, LoginScreen, SignupScreen } from '..';

const AuthStack = createStackNavigator({
  Landing: {
    screen: LandingScreen,
    navigationOptions: {
      headerTitle: 'Landing'
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Log In'
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerTitle: 'Create Account'
    }
  }
});

const App = createSwitchNavigator({
  Landing: {
    screen: LandingScreen
  },
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: SignupScreen
  }
});

export default createAppContainer(App);
