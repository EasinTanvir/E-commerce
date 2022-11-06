import React, { Fragment, useEffect, useState } from "react";

import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { User_Update, Order_My_Profile } from "../../Store/actions";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Shared/Loading/Loading";
import Modals from "../../Shared/Modal/Modal";
import Message from "../../Shared/Message/Message";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const recError = useSelector((state) => state.error);
  const LoginData = useSelector((state) => state.userLogin);
  const successMsg = useSelector((state) => state.UserDetails);
  const orderMyList = useSelector((state) => state.orderMyList);
  const { isLoading, isError } = recError;
  const { message } = successMsg;
  const { userInfo } = LoginData;
  const { orders } = orderMyList;

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: userInfo?.name,
    password: "",
    confirmpassword: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  useEffect(() => {
    dispatch(Order_My_Profile());
  }, [dispatch]);

  function onSubmitHandler(e) {
    const recData = {
      name: input.name,
      password: input.password,
    };
    e.preventDefault();
    if (input.password !== input.confirmpassword) {
      setMessage(" Sorry password didn't match");
    } else {
      dispatch(User_Update(recData));
      setShow(true);
    }
  }
  function onClickHandlers(id) {
    dispatch({ type: "ORDER_CLEAR" });
    navigate(`/order/${id}`);
  }

  const handleClose = () => {
    setShow(false);
  };

  const onClickHandler = () => {
    setShow(false);
  };
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col md={3}>
              <>
                <h2>User Profile</h2>
                <Form onSubmit={onSubmitHandler}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={input.name}
                      className="rounded mb-2"
                      onChange={onChangeHandler}
                      type="text"
                      name="name"
                      placeholder="type your name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="rounded my-2"
                      onChange={onChangeHandler}
                      name="password"
                      type="password"
                      placeholder="type your password"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className="rounded my-2"
                      onChange={onChangeHandler}
                      name="confirmpassword"
                      type="password"
                      placeholder="confirm password"
                    />
                  </Form.Group>
                  {messages && <p style={{ color: "red" }}>{messages}</p>}
                  <Button type="submit" className="rounded my-3" variant="info">
                    Update
                  </Button>
                </Form>
              </>
            </Col>
            <Col md={9}>
              {orders.length !== 0 ? (
                <>
                  <h2>My Orders</h2>
                  {isError ? (
                    <Message variant="danger">{isError}</Message>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="table-sm"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Order Date</th>
                          <th>Total</th>
                          <th>Paid At</th>
                          <th>Delivered</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item) => (
                          <tr key={item._Id}>
                            <td>{item._id}</td>
                            <td>{item.createdAt.substring(0, 10)}</td>
                            <td>{item.totalPrice}</td>
                            <td>
                              {item.isPaid ? (
                                item.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  className="fas fa-times"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </td>
                            <td>
                              {item.isDelivered ? (
                                item.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  className="fas fa-times"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </td>
                            <td>
                              <Button
                                onClick={() => onClickHandlers(item._id)}
                                className="btn-sm"
                                variant="primary rounded"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </>
              ) : (
                <h2>You haven't order anything yet</h2>
              )}
            </Col>
          </Row>
        </>
      )}
      {message && (
        <Modals
          title="Warning"
          desc={message}
          show={show}
          handleClose={handleClose}
          onClickHandler={onClickHandler}
          btn="Close"
        />
      )}
    </Fragment>
  );
};

export default ProfileScreen;
