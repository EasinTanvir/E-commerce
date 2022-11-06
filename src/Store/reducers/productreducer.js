export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload.ress,
        pages: action.payload.pages,
        page: action.payload.page,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT": {
      return { ...state, [action.payload._id]: action.payload };
    }

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT": {
      return { ...state, [action.payload._id]: action.payload };
    }

    case "EDIT_PRODUCT": {
      return { ...state, [action.payload._id]: action.payload };
    }

    default:
      return state;
  }
};

export const productTopReducer = (state = { topproduct: [] }, action) => {
  switch (action.type) {
    case "TOP_PRODUCT": {
      return { topproduct: action.payload };
    }

    default:
      return state;
  }
};
