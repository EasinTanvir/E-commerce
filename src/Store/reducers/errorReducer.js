const INITIAL_STATE = {
  isLoading: false,
  isError: null,
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ON_WAY":
      return { ...state, isLoading: true, isError: null };

    case "IS_ERROR":
      return { ...state, isError: action.payload, isLoading: false };

    case "SUCCESS":
      return { ...state, isLoading: false, isError: null };

    default:
      return state;
  }
};
