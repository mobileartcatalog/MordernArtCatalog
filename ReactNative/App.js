import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
// import Firebase, { FirebaseContext } from './app/screens/firebase';
// import { REACT_APP_API_KEY } from 'react-native-dotenv';

import DrawerNavigator from './app/screens/navigation/DrawerNavigator';
import MainNavigation from './app/screens/navigation/BottomTabNavigator';
import HamburgerIcon from './app/screens/navigation/HamburgerIcon';

console.disableYellowBox = true;

export default class App extends Component {
  static navigationOptions = () => {
    return {
      headerLeft: <HamburgerIcon />
    };
  };

  render() {
    // console.log(REACT_APP_API_KEY);
    return (
      // <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
      // </FirebaseContext.Provider>
    );
  }
}
