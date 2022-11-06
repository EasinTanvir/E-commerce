import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import Message from "../../Shared/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Product } from "../../Store/actions";
import { Link, useParams } from "react-router-dom";
import history from "../../Shared/history/history";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../../Components/Rating/Rating";

import MetaTag from "../../Components/Meta/MetaTag";

const ProductDetailScreen = () => {
  const [qty, setQty] = useState(1);

  const productId = useParams().id;

  const single = useSelector((state) => state.productDetails);
  const singleProduct = single[productId];
  //reviews
  // const  { reviews } = single;

  const recError = useSelector((state) => state.error);
  const { isLoading, isError } = recError;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Fetch_Product(productId));
  }, [productId, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/">
        <button className="btn btn-dark text-light rounded mb-3">
          Go Back
        </button>
      </Link>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Message>{isError}</Message>
      ) : (
        <>
          <MetaTag
            title={singleProduct?.name}
            description={singleProduct?.description}
          />
          <Row>
            <Col md={6}>
              <Image
                src={
                  singleProduct?.image ||
                  `http://localhost:5000/${singleProduct?.image}`
                }
                alt={singleProduct?.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flash">
                <ListGroup.Item>
                  <h3>{singleProduct?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={singleProduct?.rating}
                    text={`${singleProduct?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${singleProduct?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {singleProduct?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flash">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{singleProduct?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {singleProduct?.countInStock > 0
                          ? "In  Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {singleProduct?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Select
                            size="sm"
                            aria-label="Default select example"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(singleProduct?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="text-center my-2">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block rounded"
                      type="button"
                      disabled={singleProduct?.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailScreen;
