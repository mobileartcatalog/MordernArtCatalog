import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import {
  UserHome,
  ArtworkList,
  ArtworkListRow,
  ArtworkDetail,
  ArtworkForm,
  ExhList,
  ExhListRow
} from '..';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeTab = createSwitchNavigator({
  Home: { screen: UserHome }
});

const FormTab = createStackNavigator({
  ArtworkForm: { screen: ArtworkForm }
});

const ArtworkTab = createStackNavigator({
  ArtworkList: { screen: ArtworkList },
  ArtworkListRow: { screen: ArtworkListRow },
  ArtworkDetail: { screen: ArtworkDetail }
});

const ExhTab = createStackNavigator({
  ExhList: { screen: ExhList },
  ExhListRow: { screen: ExhListRow }
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={25} />
        )
      }
    },
    Form: {
      screen: FormTab,
      navigationOptions: {
        tabBarLabel: 'New Artwork',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle" color={tintColor} size={25} />
        )
      }
    },
    Art: {
      screen: ArtworkTab,
      navigationOptions: {
        tabBarLabel: 'Artwork',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-square-outline" color={tintColor} size={25} />
        )
      }
    },

    Exhibitions: {
      screen: ExhTab,
      navigationOptions: {
        tabBarLabel: 'Exhibitions',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-business" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      initialRouteName: 'Art',
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'whitesmoke',
        paddingVertical: 10
      }
    }
  }
);

export default createAppContainer(AppNavigator);
