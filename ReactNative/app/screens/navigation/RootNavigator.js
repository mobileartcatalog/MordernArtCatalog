import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import LandingScreen from "../auth/LandingScreen";

const RootNavigator = createSwitchNavigator(
  {
    // const RootNavigator = createBottomTabNavigator({
    AuthLanding: { screen: LandingScreen },
    App: { screen: AppNavigator },
    Auth: { screen: AuthNavigator }
  },
  {
    initialRouteName: "AuthLanding"
  }
);

export default createAppContainer(RootNavigator);
