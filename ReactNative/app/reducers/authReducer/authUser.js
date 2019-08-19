import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

const AUTH_USER = 'AUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';

const authUser = (uid, email) => ({
  type: 'AUTH_USER',
  uid,
  email
});

const authError = error => ({
  type: 'AUTH_ERROR',
  error
});

export const getUser = () => {
  return async dispatch => {
    try {
      const user = await AsyncStorage.multiGet(['uid', 'email']);
      if (user) {
        const uid = '12345';
        const email = 'fakeemail';
        dispatch(authUser(uid, email));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const storeUser = (uid, email) => {
  return async dispatch => {
    const uid = ['uid', uid];
    const email = ['email', email];
    try {
      await AsyncStorage.multiSet([uid, email]);
    } catch (error) {
      console.log(error);
    }
  };
};

export const signupUser = (email, password, stayLoggedIn) => {
  return async dispatch => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const { uid, email } = user;
          dispatch(authUser(uid, email));
          if (stayLoggedIn) {
            dispatch(storeUser(uid, email));
          }
        }
      });
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const loginUser = (email, password, stayLoggedIn) => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const { uid, email } = user;
          dispatch(authUser(uid, email));
          if (stayLoggedIn) {
            dispatch(storeUser(uid, email));
          }
        }
      });
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
        uid: action.uid,
        email: action.email
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default reducer;
