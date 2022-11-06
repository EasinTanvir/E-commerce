import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import Message from "../../Shared/Message/Message";
import FormContainer from "../../Components/FormContainer/FormContainer";
import { Create_Product } from "../../Store/actions";

const AdminCreateProduct = () => {
  const [file, setFile] = useState();
  const [input, setInput] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    rating: "",
    numReviews: "",
    price: "",
    countInStock: "",
  });

  const dispatch = useDispatch();

  const recError = useSelector((state) => state.error);

  const { isLoading, isError } = recError;

  function onChangeHandler(e) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("image", file);
    formData.append("brand", input.brand);
    formData.append("category", input.category);
    formData.append("description", input.description);
    formData.append("rating", input.rating);
    formData.append("numReviews", input.numReviews);
    formData.append("price", input.price);
    formData.append("countInStock", input.countInStock);

    dispatch(Create_Product(formData));
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light ">
        Go Back
      </Link>
      <FormContainer>
        <h2>Create Product</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{isError}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="text"
                name="name"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="rounded my-2"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="text"
                name="brand"
                placeholder="Enter brand"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="text"
                name="category"
                placeholder="Enter category"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Decription</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="text"
                name="description"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="number"
                name="rating"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Num of Reviews</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="number"
                name="numReviews"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="number"
                name="price"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="number"
                name="countInStock"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Button type="submit" className="rounded my-3" variant="info">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminCreateProduct;
