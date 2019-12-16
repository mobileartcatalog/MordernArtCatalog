import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { getUser } from "../../reducers/authReducer/authUser";
import UserHome from "../user/UserHome";
import LoginScreen from "./LoginScreen";
import * as firebase from "firebase";

class LandingScreen extends Component {
  componentDidMount() {
    const { getUser, navigation, authenticated, uid } = this.props;
    getUser();
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("user is logged");
    //     navigation.navigate("App");
    //   }
    // });
    // console.log("landing props after componentDidMount getUser", this.props);
  }

  render() {
    const { authenticated } = this.props;
    return (
      <View style={{ marginTop: 75 }}>
        {authenticated ? <UserHome /> : <LoginScreen />}
      </View>
    );
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    uid: state.auth.uid,
    loading: state.auth.loading
  };
};

const mapDispatch = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(mapState, mapDispatch)(LandingScreen);
