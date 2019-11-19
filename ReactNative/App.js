import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Firebase, { FirebaseContext } from "./app/screens/firebase";
import { setNavigator } from "./app/navigationRef";

import RootNavigator from "./app/screens/navigation/RootNavigator";

console.disableYellowBox = true;

export default class App extends Component {
  static navigationOptions = () => {
    return {
      headerLeft: <HamburgerIcon />
    };
  };

  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
          <RootNavigator
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </Provider>
      </FirebaseContext.Provider>
    );
  }
}
