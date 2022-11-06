import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/FormContainer/FormContainer";
import { Save_ShippingAddress } from "../../Store/actions";
import CheckOut from "../../Components/Checkout/CheckOut";

const SheppingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddresss } = cart;

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    address: shippingAddresss?.address,
    city: shippingAddresss?.city,
    postalCode: shippingAddresss?.postalCode,
    country: shippingAddresss?.country,
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function onClickHandler() {
    dispatch({ type: "ORDER_CLEAR" });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const recData = {
      address: input.address,
      postalCode: input.postalCode,
      city: input.city,
      country: input.country,
    };
    dispatch(Save_ShippingAddress(recData));
  }

  return (
    <FormContainer>
      <CheckOut step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={input.address}
            className="rounded my-2"
            onChange={onChangeHandler}
            name="address"
            type="text"
            required
            placeholder="type your address"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={input.city}
            className="rounded my-2"
            onChange={onChangeHandler}
            name="city"
            type="text"
            required
            placeholder="Enter city"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={input.postalCode}
            className="rounded my-2"
            onChange={onChangeHandler}
            name="postalCode"
            type="text"
            required
            placeholder="Ente postal code"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={input.country}
            className="rounded my-2"
            onChange={onChangeHandler}
            name="country"
            type="text"
            required
            placeholder="Enter country name"
          />
        </Form.Group>
        <Button
          onClick={onClickHandler}
          type="submit"
          className="rounded my-3"
          variant="primary"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SheppingPage;
