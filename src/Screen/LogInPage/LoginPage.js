/* eslint-disable no-restricted-globals */
import React, { Fragment, useState } from "react";

import { Row, Col, Form, Button } from "react-bootstrap";
import { Log_In, Sign_Up } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../Components/FormContainer/FormContainer";
import Loading from "../../Shared/Loading/Loading";

import Modals from "../../Shared/Modal/Modal";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  //const LoginData = useSelector((state) => state.userLogin);
  const recError = useSelector((state) => state.error);
  const { isLoading, isError } = recError;

  //const { userInfo } = LoginData;

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isLogedin) {
      if (input.password !== input.confirmpassword) {
        setMessage(" Sorry password didn't match");
      } else {
        const signup = {
          name: input.name,
          email: input.email,
          password: input.password,
        };
        dispatch(Sign_Up(signup));
        setShow(true);
      }
    } else {
      const recData = {
        email: input.email,
        password: input.password,
      };
      dispatch(Log_In(recData));
      setShow(true);
    }
  };

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
          {" "}
          <FormContainer>
            <h1>SignIn</h1>
            <Form onSubmit={onSubmitHandler}>
              {isLogedin && (
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="rounded mb-2"
                    onChange={onChangeHandler}
                    type="text"
                    required
                    name="name"
                    placeholder="type your name"
                  />
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="rounded mb-2"
                  onChange={onChangeHandler}
                  type="email"
                  required
                  name="email"
                  placeholder="type your email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="rounded my-2"
                  onChange={onChangeHandler}
                  name="password"
                  type="password"
                  required
                  placeholder="type your password"
                />
              </Form.Group>

              {isLogedin && (
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    className="rounded my-2"
                    onChange={onChangeHandler}
                    name="confirmpassword"
                    type="password"
                    required
                    placeholder="confirm password"
                  />
                </Form.Group>
              )}
              {message && <p style={{ color: "red" }}>{message}</p>}

              <Button
                disabled={!input.email || !input.password}
                type="submit"
                className="rounded my-3"
                variant="info"
              >
                {isLogedin ? "Register" : "Sign In"}
              </Button>
            </Form>
            <Row>
              <Col>
                {isLogedin
                  ? "already have an account?   "
                  : "don't have an account?   "}
                <Button
                  variant="primary"
                  className="rounded "
                  onClick={() => setIsLogedin(!isLogedin)}
                >
                  {isLogedin ? "LogIn" : "Register"}
                </Button>
              </Col>
            </Row>
            {isError && (
              <Modals
                title="Warning"
                desc={isError}
                show={show}
                handleClose={handleClose}
                onClickHandler={onClickHandler}
                btn="Close"
              />
            )}
          </FormContainer>
        </>
      )}
    </Fragment>
  );
};

export default LoginPage;
