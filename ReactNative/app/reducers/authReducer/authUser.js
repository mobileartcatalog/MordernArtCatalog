import * as firebase from 'firebase';

const AUTH_USER = 'AUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const LOGGED_OUT = 'LOGGED_OUT';

const authUser = (uid, email) => ({
  type: 'AUTH_USER',
  uid,
  email
});

const authError = error => ({
  type: 'AUTH_ERROR',
  error
});

const loggedOut = () => ({
  type: 'LOGGED_OUT'
});

export const signupUser = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // await firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     const { uid, email } = user;
      //     dispatch(authUser(uid, email));
      //   }
      // });
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const loginUser = (email, password, persistLogin) => {
  return async dispatch => {
    try {
      if (persistLogin) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.NONE);
      }
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(getUser());
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const getUser = () => {
  return async dispatch => {
    try {
      const user = await firebase.auth().currentUser;
      console.log('getUser results', user);
      if (user) {
        const { uid, email } = user;
        dispatch(authUser(uid, email));
      }
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    try {
      await firebase.auth().signOut();
      dispatch(getUser());
      dispatch(loggedOut());
      // clear art, exhibitions, user data from state
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
    case LOGGED_OUT:
      return {
        ...state,
        authenticated: false,
        error: null,
        uid: '',
        email: ''
      };
    default:
      return state;
  }
};

export default reducer;
