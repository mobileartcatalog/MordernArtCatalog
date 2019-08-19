import * as firebase from 'firebase';

const AUTH_USER = 'AUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';

const authUser = () => ({
  type: 'AUTH_USER'
});

const authError = error => ({
  type: AUTH_ERROR,
  error
});

export function signupUser(email, password) {
  return function(dispatch) {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  };
}

export const loginUser = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      response => {
        dispatch(authUser(user));
      };
    } catch (error) {
      console.log(error);
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
        error: null
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
