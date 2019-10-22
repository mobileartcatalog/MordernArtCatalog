import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { LandingScreen, LoginScreen, SignupScreen } from '..';

const AuthNavigator = createStackNavigator({
  Landing: { screen: LandingScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen }
});

export default createAppContainer(AuthNavigator);

