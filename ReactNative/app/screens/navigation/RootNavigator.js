import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// const RootNavigator = createSwitchNavigator({
const RootNavigator = createBottomTabNavigator({
  Auth: { screen: AuthNavigator },
  App: { screen: AppNavigator },
});

export default createAppContainer(RootNavigator);
