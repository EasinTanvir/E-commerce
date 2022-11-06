export const adminUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "ADMIN_USER_UPDATE":
      return { user: action.payload, message: "User Update Successfully" };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USER_LIST":
      return { users: action.payload };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case "USER_DELETE":
      return { state, message: action.payload };

    default:
      return state;
  }
};
