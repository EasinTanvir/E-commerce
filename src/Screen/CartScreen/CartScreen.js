import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Cart_Items, Remove_Cart } from "../../Store/actions";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Shared/Message/Message";
import history from "../../Shared/history/history";

const CartScreen = () => {
  const params = useParams().id;
  const qty = Number(useLocation().search.split("=")[1]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart);
  const { cartItems } = carts;

  useEffect(() => {
    if (params) {
      dispatch(Cart_Items(params, qty));
    }
  }, [dispatch, params, qty]);

  const remodeHandler = (id) => {
    dispatch(Remove_Cart(id));
    history.push("/cart");
  };
  const checkOutHandler = (id) => {
    history.push("/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            You Card is Empty{" "}
            <Link className="btn btn-primary mx-4 rounded" to="/">
              Go Back
            </Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flash">
            {cartItems.map((items) => (
              <ListGroup.Item key={items.product}>
                <Row>
                  <Col md={2}>
                    <Image src={items.image} alt={items.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${items.product}`}>{items.name}</Link>
                  </Col>
                  <Col md={2}>${items.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      value={items.qty}
                      onChange={(e) =>
                        dispatch(
                          Cart_Items(items.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(items.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => remodeHandler(items.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flash">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, items) => acc + items.qty, 0)}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block mx-5 my-2"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
