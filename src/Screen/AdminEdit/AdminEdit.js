import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import Message from "../../Shared/Message/Message";
import FormContainer from "../../Components/FormContainer/FormContainer";
import { Admin_Update } from "../../Store/actions";

const AdminEdit = () => {
  const userId = useParams().id;
  const dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.userLists);
  const { users } = adminDetails;
  const singleUser = users.find((item) => item._id === userId);
  const [isAdmin, setIsAdmin] = useState(singleUser.isAdmin);
  console.log(isAdmin);
  const [input, setInput] = useState({
    name: singleUser.name,
    email: singleUser.email,
  });

  const recError = useSelector((state) => state.error);

  const { isLoading, isError } = recError;

  function onChangeHandler(e) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const recData = {
      name: input.name,
      email: input.email,
      isAdmin,
    };
    dispatch(Admin_Update(userId, recData));
  }
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Update User</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{isError}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={input.name}
                className="rounded mb-2"
                onChange={onChangeHandler}
                type="text"
                name="name"
                placeholder="type your name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="rounded my-2"
                onChange={onChangeHandler}
                name="email"
                value={input.email}
                type="email"
                placeholder="type your password"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Check
                className="rounded my-2"
                onChange={(e) => setIsAdmin(e.target.checked)}
                label="isAdmin"
                checked={isAdmin}
                type="checkbox"
              />
            </Form.Group>

            <Button type="submit" className="rounded my-3" variant="info">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminEdit;
