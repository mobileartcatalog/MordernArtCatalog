import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {
  UserHome,
  ArtworkList,
  ArtworkListRow,
  ArtworkDetail,
  ArtworkForm,
  ArtworkEdit,
  ExhList,
  ExhDetail,
  ExhForm,
  ExhEdit,
} from '..';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeTab = createStackNavigator({
  Home: { screen: UserHome },
});

const ArtworkForms = createSwitchNavigator({
  ArtworkForm: {
    screen: ArtworkForm,
  },
  ArtworkEdit: {
    screen: ArtworkEdit,
  },
});

const ArtworkTab = createStackNavigator(
  {
    ArtworkList: { screen: ArtworkList },
    ArtworkListRow: { screen: ArtworkListRow },
    ArtworkDetail: { screen: ArtworkDetail },
    ArtworkForms: { screen: ArtworkForms },
    ExhList: { screen: ExhList },
    ExhDetail: { screen: ExhDetail },
    ExhForm: { screen: ExhForm },
    ExhEdit: { screen: ExhEdit },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'whitesmoke',
      },
      headerTintColor: 'slategray',
    },
  }
);

const ExhTab = createStackNavigator({
  ExhList: { screen: ExhList },
  ExhDetail: { screen: ExhDetail },
  ExhForm: { screen: ExhForm },
  ExhEdit: { screen: ExhEdit },
  ArtworkList: { screen: ArtworkList },
  ArtworkDetail: { screen: ArtworkDetail },
});

const FormTab = createStackNavigator({
  ArtworkForm: { screen: ArtworkForm },
  ExhForm: { screen: ExhForm },
});

const AppTab = createStackNavigator({
  ArtworkList: { screen: ArtworkList },
  ArtworkListRow: { screen: ArtworkListRow },
  ArtworkDetail: { screen: ArtworkDetail },
  ArtworkForms: { screen: ArtworkForms },
  ExhList: { screen: ExhList },
  ExhDetail: { screen: ExhDetail },
  ExhForm: { screen: ExhForm },
  ExhEdit: { screen: ExhEdit },
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={25} />
        ),
      },
    },

    Art: {
      screen: ArtworkTab,
      navigationOptions: {
        tabBarLabel: 'Artwork',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-square-outline" color={tintColor} size={25} />
        ),
      },
    },

    Exhibitions: {
      screen: ExhTab,
      navigationOptions: {
        tabBarLabel: 'Exhibitions',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-business" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      initialRouteName: 'Art',
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'whitesmoke',
        paddingVertical: 10,
      },
    },
  }
);

export default createAppContainer(AppNavigator);
