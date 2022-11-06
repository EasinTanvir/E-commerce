export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, userInfo: action.payload };

    case "SIGN_UP":
      return { ...state, userInfo: action.payload };

    case "LOG_OUT":
      return {};

    default:
      return state;
  }
};
