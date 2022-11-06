import React, { useEffect } from "react";

import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Shared/Message/Message";
import { Fetch_AllOrder } from "../../Store/actions";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const AdminAllOrder = () => {
  //const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const orderLists = useSelector((state) => state.allOrder);
  const recError = useSelector((state) => state.error);
  const userDelete = useSelector((state) => state.userDelete.message);

  const { isLoading, isError } = recError;
  const order = Object.values(orderLists);
  const { message } = userDelete;
  console.log(message);

  useEffect(() => {
    dispatch(Fetch_AllOrder());
  }, [dispatch]);

  const onClickHandler = (id) => {
    dispatch({ type: "ORDER_CLEAR" });
    navigate(`/order/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <>
          <h2>Orders</h2>
          {order.length > 0 && (
            <>
              <Table striped bordered responsive hover className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.user && item.user.name}</td>
                      <td>{item.createdAt.substring(0, 10)}</td>
                      <td>{item.totalPrice}</td>
                      <td>
                        {item.isPaid ? (
                          item.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {item.isDelivered ? (
                          item.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Button
                          onClick={() => onClickHandler(item._id)}
                          className="btn-sm rounded"
                          variant="primary"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminAllOrder;
