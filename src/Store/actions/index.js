import axios from "axios";
import history from "../../Shared/history/history";
export const Fetch_Products =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "ON_WAY" });
      const res = await axios.get(
        process.env.REACT_APP_DATABASE_URL +
          `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: "FETCH_PRODUCTS", payload: res.data });
      dispatch({ type: "SUCCESS" });
    } catch (err) {
      dispatch({ type: "IS_ERROR", payload: err.response.data.message });
    }
  };

export const Fetch_Product = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/products/${id}`
    );
    dispatch({ type: "FETCH_PRODUCT", payload: res.data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Delete_Product = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "ON_WAY" });
    await axios.delete(
      process.env.REACT_APP_DATABASE_URL + `/api/products/${id}`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "SUCCESS" });

    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Cart_Items = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/products/${id}`
    );
    dispatch({
      type: "ADD_CART_ITEM",
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem("carts", JSON.stringify(getState().cart.cartItems));
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Remove_Cart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  } catch (err) {
    console.log(err);
  }
  localStorage.setItem("carts", JSON.stringify(getState().cart.cartItems));
};

export const Log_In = (recData) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.post(
      process.env.REACT_APP_DATABASE_URL + "/api/auth/login",
      recData
    );
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    dispatch({ type: "LOG_IN", payload: res.data });
    dispatch({ type: "SUCCESS" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Sign_Up = (recData) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.post(
      process.env.REACT_APP_DATABASE_URL + "/api/auth/signup",
      recData
    );
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    dispatch({ type: "SIGN_UP", payload: res.data });
    dispatch({ type: "SUCCESS" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Log_Out = () => {
  return {
    type: "LOG_OUT",
  };
};

//wrong away

export const User_Details = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/auth/${id}`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: "ADMIN_USER_DETAILS", payload: res.data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const User_Update = (formdata) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.patch(
      process.env.REACT_APP_DATABASE_URL + `/api/auth/update`,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "UPDATE_USER", payload: res.data.message });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Save_ShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: "SAVE_SHIPPING", payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    history.push("/payment");
  } catch (err) {
    console.log(err);
  }
};

export const Save_PaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: data });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
    history.push("/placeorder");
  } catch (err) {
    console.log(err);
  }
};

export const Create_Order = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.post(
      process.env.REACT_APP_DATABASE_URL + `/api/orders`,
      order,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "ORDER_CREATE", payload: res.data });

    dispatch({ type: "SUCCESS" });
    history.push(`/order/${res.data._id}`);
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Order_Details = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/orders/${id}`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "ORDER_DETAILS", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Order_Payment =
  (orderId, paymentResult) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: "ON_WAY" });
      const res = await axios.put(
        process.env.REACT_APP_DATABASE_URL + `/api/orders/${orderId}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );

      dispatch({ type: "ORDER_PAYMENT", payload: res.data });

      dispatch({ type: "SUCCESS" });
    } catch (err) {
      dispatch({ type: "IS_ERROR", payload: err.response.data.message });
    }
  };

export const Order_My_Profile = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/orders/myorders`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "ORDER_LIST_PROFILE", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const AllUser_List = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/auth/allusers`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "USER_LIST", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const User_Delete = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.delete(
      process.env.REACT_APP_DATABASE_URL + `/api/auth/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "USER_DELETE", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Admin_Update = (id, formData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.patch(
      process.env.REACT_APP_DATABASE_URL + `/api/auth/adminupdate/${id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "ADMIN_USER_UPDATE", payload: res.data });

    dispatch({ type: "SUCCESS" });
    history.push("/admin/userlist");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Create_Product = (formData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.post(
      process.env.REACT_APP_DATABASE_URL + `/api/products/create`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "CREATE_PRODUCT", payload: data });
    dispatch({ type: "SUCCESS" });

    history.push("/admin/productlist");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Edit_Product = (id, formData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.patch(
      process.env.REACT_APP_DATABASE_URL + `/api/products/update/${id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "EDIT_PRODUCT", payload: data });
    dispatch({ type: "SUCCESS" });

    history.push("/admin/productlist");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_AllOrder = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/orders/allorders`,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "FETCH_ALLORDER", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Order_Deliver = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.put(
      process.env.REACT_APP_DATABASE_URL + `/api/orders/${order._id}/deliver`,
      {},
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );

    dispatch({ type: "ORDER_DELIVER", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Top_Product = () => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const res = await axios.get(
      process.env.REACT_APP_DATABASE_URL + `/api/products/top`
    );

    dispatch({ type: "TOP_PRODUCT", payload: res.data });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};
