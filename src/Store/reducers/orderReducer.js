import _ from "lodash";
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE":
      return { order: action.payload };

    default:
      return state;
  }
};

export const AllorderReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALLORDER":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS":
      return { order: action.payload };

    case "ORDER_CLEAR":
      return {};

    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAYMENT":
      return { success: true };

    case "ORDER_RESET":
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducers = (
  state = { deliverSuccess: false },
  action
) => {
  switch (action.type) {
    case "ORDER_DELIVER":
      return { ...state, deliverSuccess: true };

    default:
      return state;
  }
};

export const orderShowProfileReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_LIST_PROFILE":
      return { orders: action.payload };

    case "ORDER_RESET":
      return { orders: [] };

    default:
      return state;
  }
};
