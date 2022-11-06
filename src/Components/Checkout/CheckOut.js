import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckOut = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4  border p-2 rounded">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>SignIn</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SignIn</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/plceorder">
            <Nav.Link>PlaceOrder</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>PlaceOrder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOut;
