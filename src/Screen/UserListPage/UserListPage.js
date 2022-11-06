import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Shared/Message/Message";
import { AllUser_List, User_Delete } from "../../Store/actions";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const UserListPage = () => {
  //const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLists = useSelector((state) => state.userLists);
  const recError = useSelector((state) => state.error);
  const LoginData = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete.message);
  const { userInfo } = LoginData;

  const { isLoading, isError } = recError;
  const { users } = userLists;
  const { message } = userDelete;
  console.log(message);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(AllUser_List());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, userDelete]);

  const onDeleteHanddler = (id) => {
    if (window.confirm("Are you sure you want to Delete")) {
      dispatch(User_Delete(id));
    }
  };

  // const handleClose = () => {
  //   setShow(false);
  // };

  // const onClickHandler = () => {
  //   setShow(false);
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <>
          {/* {message && !isLoading && !isError && (
            <Modals
              title="Message"
              desc={message}
              show={show}
              handleClose={handleClose}
              onClickHandler={onClickHandler}
              btn="Close"
            />
          )} */}
          <h2>Users</h2>
          <Table striped bordered responsive hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {userInfo._id !== item._id &&
                      userInfo.isAdmin !== item.isAdmin && (
                        <>
                          <LinkContainer to={`/admin/user/${item._id}/edit`}>
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
        </>
      )}
    </>
  );
};

export default UserListPage;
