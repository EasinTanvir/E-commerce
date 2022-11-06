import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Shared/Message/Message";
import { Delete_Product, Fetch_Products } from "../../Store/actions";
import Loader from "../../Shared/Loader/Loader";
import Paginate from "../../Components/Paginnate/Paginate";

const AdminProductList = () => {
  const pageParams = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const myproducts = useSelector((state) => state.products);
  const recError = useSelector((state) => state.error);
  const LoginData = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete.message);
  const { userInfo } = LoginData;

  const { products: allProducts, pages, page } = myproducts;

  const { isLoading, isError } = recError;

  const { message } = userDelete;
  console.log(message);

  useEffect(() => {
    dispatch(Fetch_Products("", pageParams));
  }, [dispatch, pageParams]);

  const onDeleteHanddler = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      dispatch(Delete_Product(id));
      window.location.reload();
    }
  };
  const createProductHandler = () => {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/createproduct">
            <Button
              className="my-3 mb-3 rounded"
              onClick={createProductHandler}
            >
              Create Product <i className="fas fa-plus"></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>

                <td>
                  {userInfo._id !== item._id &&
                    userInfo.isAdmin !== item.isAdmin && (
                      <>
                        <LinkContainer to={`/admin/product/${item._id}/edit`}>
                          <Button
                            variant="light"
                            className="btn-sm rounded me-2"
                          >
                            Edit <i className="fas fa-edit"></i>{" "}
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm rounded"
                          onClick={() => onDeleteHanddler(item._id)}
                        >
                          Delete <i className="fas fa-trash"></i>
                        </Button>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!isLoading && (
        <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
      )}
    </>
  );
};

export default AdminProductList;
