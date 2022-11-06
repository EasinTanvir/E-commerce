import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Message from "../../Shared/Message/Message";
import { Link } from "react-router-dom";
import {
  Order_Details,
  Order_Payment,
  Order_Deliver,
} from "../../Store/actions";
import Loading from "../../Shared/Loading/Loading";
import Loader from "../../Shared/Loader/Loader";

const CheckOutOrder = () => {
  const navigate = useNavigate();
  const params = useParams().id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const LoginData = useSelector((state) => state.userLogin);
  const { userInfo } = LoginData;
  console.log(sdkReady);
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPayment = useSelector((state) => state.orderPay);
  const { success } = orderPayment;

  const recError = useSelector((state) => state.error);
  const { isLoading, isError } = recError;
  const { order } = orderDetails;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        process.env.REACT_APP_DATABASE_URL + "/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || success) {
      dispatch({ type: "ORDER_RESET" });

      dispatch(Order_Details(params));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, params, order, success]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(Order_Payment(params, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(Order_Deliver(order));
    dispatch({ type: "ORDER_CLEAR" });

    setTimeout(() => {
      navigate("/admin/orderlist");
    }, 700);
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Message>{isError}</Message>
  ) : (
    <>
      <h2>OrderId : ({order?._id})</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="text-start">Shipping</h2>
              <strong>Name : </strong>
              {order?.user.name || "error"}
              <p>
                <strong>Email : </strong>
                <a href={`mailto:${order?.user.email}`}>
                  {" "}
                  ({order?.user.email || "failed"})
                </a>
              </p>
              <p>
                <strong>Address : </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},-
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country},
              </p>

              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-start">Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-start">Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, i) => (
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
                          {(item.qty * item.price).toFixed(2)}
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
                  <Col>${order?.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax (10%)</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {isLoading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order?.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {isLoading && <Loader />}
              {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Marik as Deliver
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckOutOrder;
