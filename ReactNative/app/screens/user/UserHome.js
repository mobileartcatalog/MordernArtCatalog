import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../../stylesheets/forms.js";
import { getArt } from "../../reducers/artReducer/getArt";
import { getExh } from "../../reducers/exhReducer/getExh";
import { logoutUser } from "../../reducers/authReducer/authUser";
import { StyledSecondaryButton } from "../formComponents";

class UserHome extends Component {
  componentDidMount() {
    const { loaded, getExh, getArt, uid } = this.props;
    console.log("in UserHome screen,", uid);
    if (!loaded) {
      getArt(uid);
      getExh(uid);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      art,
      artCount,
      exh,
      exhCount,
      authenticated,
      email,
      uid,
      logoutUser
    } = this.props;

    return authenticated ? (
      <View style={styles.container}>
        <Text style={styles.headlineText}>User Home</Text>
        <Text style={styles.h1}>{email}</Text>
        <Text style={styles.h1}>{uid}</Text>

        <View style={styles.innerContainer}>
          {!artCount ? (
            <ActivityIndicator />
          ) : (
            <StyledSecondaryButton
              title={`Artwork  ${artCount}`}
              onPress={() => navigate("ArtworkList")}
            />
          )}
        </View>

        <View style={styles.innerContainer}>
          {!exhCount ? (
            <ActivityIndicator />
          ) : (
            <StyledSecondaryButton
              title={`Exhibitions  ${exhCount}`}
              onPress={() => navigate("ExhList")}
            />
          )}
        </View>

        <StyledSecondaryButton
          title="Log out"
          onPress={() => {
            logoutUser();
            this.props.navigation.navigate("Login");
          }}
        />
      </View>
    ) : (
      <ActivityIndicator />
    );
    // }
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    uid: state.auth.uid,
    loaded: state.art.loaded,
    art: state.art.all,
    artCount: state.art.count,
    exh: state.exhibitions.all,
    exhCount: state.exhibitions.count
  };
};

const mapDispatch = dispatch => ({
  getArt: uid => dispatch(getArt(uid)),
  getExh: uid => dispatch(getExh(uid)),
  logoutUser: () => dispatch(logoutUser())
});

export default withNavigation(connect(mapState, mapDispatch)(UserHome));
