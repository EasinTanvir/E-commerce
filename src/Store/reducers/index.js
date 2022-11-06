import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";
import {
  AllorderReducer,
  orderDeliverReducers,
  orderDetailsReducer,
  orderPaymentReducer,
  orderReducer,
  orderShowProfileReducer,
} from "./orderReducer";
import {
  productReducer,
  productDetailsReducer,
  productCreateReducer,
  productTopReducer,
} from "./productreducer";
import {
  adminUserDetailsReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
} from "./userDetailsReducer";

const storedata = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];

const storeUserdata = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const Initial_State = {
  cart: { cartItems: storedata, shippingAddresss: shippingAddress },
  userLogin: { userInfo: storeUserdata },
};

const store = configureStore({
  reducer: {
    error: errorReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
    topProduct: productTopReducer,
    createProduct: productCreateReducer,
    cart: cartReducer,
    userLogin: authReducer,
    UserDetails: userDetailsReducer,
    adminDetails: adminUserDetailsReducer,
    userLists: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderReducer,
    orderDetails: orderDetailsReducer,
    orderDelivery: orderDeliverReducers,
    allOrder: AllorderReducer,
    orderPay: orderPaymentReducer,
    orderMyList: orderShowProfileReducer,
  },
  preloadedState: Initial_State,
});

export default store;
