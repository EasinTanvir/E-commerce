import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../../Shared/Message/Message";
import CheckOut from "../../Components/Checkout/CheckOut";
import { Link } from "react-router-dom";
import { Create_Order } from "../../Store/actions";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const addDecimel = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const toUpdateCart = { ...cart };

  toUpdateCart.itemPrice = addDecimel(
    toUpdateCart.cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0)
  );

  toUpdateCart.shippingPrice = addDecimel(
    toUpdateCart.itemPrice > 100 ? 20 : 100
  );
  toUpdateCart.taxPrice = addDecimel(
    Number(0.1 * toUpdateCart.itemPrice).toFixed(2)
  );
  toUpdateCart.totalPrice = (
    Number(toUpdateCart.itemPrice) +
    Number(toUpdateCart.shippingPrice) +
    Number(toUpdateCart.taxPrice)
  ).toFixed(2);

  // const orderCreate = useSelector((state) => state.orderCreate);
  // const recError = useSelector((state) => state.error);
  // const { isLoading, isError } = recError;
  // const { order } = orderCreate;
  // console.log(order, "order");
  // console.log(isError, "error");

  // useEffect(() => {
  //   if (!isError && !isLoading && order) {
  //     navigate(`/order/${order._id}`);
  //   }
  // }, [order, navigate, isError, isLoading]);

  const placeOrderHandler = () => {
    const recData = {
      orderItems: cart.cartItems,
      shippingAddress: shippingAddress,
      itemPrice: toUpdateCart.itemPrice,
      paymentMethod: cart.paymentMethod,
      shippingPrice: toUpdateCart.shippingPrice,
      taxPrice: toUpdateCart.taxPrice,
      totalPrice: toUpdateCart.totalPrice,
    };

    dispatch(Create_Order(recData));
  };

  return (
    <>
      <CheckOut step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-start">Shipping</h2>
              <p>
                <strong>Address : </strong>
                {shippingAddress.address}, {shippingAddress.city},-
                {shippingAddress.postalCode}, {shippingAddress.country},
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-start">Payment Method</h2>
              <strong>Method : </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-start">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>You card is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {addDecimel(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="p-1 mt-2" md={4}>
          <Card>
            <ListGroup className="rounded border p-1" variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Products</Col>
                  <Col>${toUpdateCart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${toUpdateCart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax (10%)</Col>
                  <Col>${toUpdateCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${toUpdateCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100 rounded"
                  variant="primary"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
