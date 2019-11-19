import reduceReducers from "reduce-reducers";

import loginUser from "./authUser";
import signupUser from "./authUser";
import storeUser from "./authUser";
import getUser from "./authUser";

const initialState = {
  authenticated: false,
  error: null,
  uid: "",
  email: "",
  loading: false
};

const authReducer = reduceReducers(
  initialState,
  getUser,
  storeUser,
  loginUser,
  signupUser
);

export default authReducer;
