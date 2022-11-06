import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { Top_Product } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Shared/Loader/Loader";
import Message from "../../Shared/Message/Message";

const Carousels = () => {
  const dispatch = useDispatch();
  const recError = useSelector((state) => state.error);
  const topProduct = useSelector((state) => state.topProduct);
  const { isLoading, isError } = recError;
  const { topproduct } = topProduct;

  useEffect(() => {
    dispatch(Top_Product());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{isError}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {topproduct.map((item) => (
            <Carousel.Item key={item._id}>
              <Link to={`/product/${item._id}`}>
                <Image src={item.image} alt={item.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>{item.name}</h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Carousels;
