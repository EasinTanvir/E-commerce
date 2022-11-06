import React, { Fragment, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Products } from "../../Store/actions";
import Loading from "../../Shared/Loading/Loading";
import Message from "../../Shared/Message/Message";

import Product from "../../Components/Products/Product";
import { useParams } from "react-router-dom";
import Paginate from "../../Components/Paginnate/Paginate";
import Carousels from "../../Components/Carousel/Carousels";
import MetaTag from "../../Components/Meta/MetaTag";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const params = useParams().keyword;
  const pageParams = useParams().pageNumber;

  const dispatch = useDispatch();
  // const orderMyList = useSelector((state) => state.orderMyList);
  // const { orders } = orderMyList;
  const recProducts = useSelector((state) => state.products);
  const { products, page, pages } = recProducts;

  const recError = useSelector((state) => state.error);
  const { isLoading, isError } = recError;

  const myProduct = products;
  console.log(params);
  //console.log(recProducts);

  useEffect(() => {
    dispatch(Fetch_Products(params, pageParams));
  }, [dispatch, params, pageParams]);

  return (
    <Fragment>
      <MetaTag />
      {!params && !pageParams ? (
        <Carousels />
      ) : (
        <Link to="/" className="btn btn-dark rounded">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Message>{isError}</Message>
      ) : (
        <>
          {" "}
          {!pageParams && !params && (
            <h2 style={{ marginTop: "10px" }} className="display-4">
              Latest Products
            </h2>
          )}
          <Row>
            {myProduct?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={params ? params : ""} />
        </>
      )}
    </Fragment>
  );
};

export default HomeScreen;
