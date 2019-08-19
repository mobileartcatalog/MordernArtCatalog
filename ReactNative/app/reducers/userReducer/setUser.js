const SETTING_USER = 'SETTING_USER';

const settingUser = user => ({
  type: 'SETTING_USER',
  user
});

const setUser = user => {
  return async dispatch => {
    console.log(user);
    try {
      dispatch(settingUser(user));
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SETTING_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;
