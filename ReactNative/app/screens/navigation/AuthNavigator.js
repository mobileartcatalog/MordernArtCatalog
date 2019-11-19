import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { LandingScreen, LoginScreen, SignupScreen, UserHome } from "..";

const AuthNavigator = createStackNavigator({
  Landing: { screen: LandingScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  UserHome: { screen: UserHome }
});

export default createAppContainer(AuthNavigator);
