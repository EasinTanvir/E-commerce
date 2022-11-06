import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../../Components/FormContainer/FormContainer";

import CheckOut from "../../Components/Checkout/CheckOut";
import { Save_PaymentMethod } from "../../Store/actions";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  console.log(paymentMethod);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddresss } = cart;

  if (!shippingAddresss) {
    navigate("/shipping");
  }
  const dispatch = useDispatch();

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(Save_PaymentMethod(paymentMethod));
    //dispatch() save payment method and navigate to shippimg
  }

  return (
    <FormContainer>
      <CheckOut step1 step2 step3 />
      <h1 className="display-5 mb-3">Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="label">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" className="rounded mt-4" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
