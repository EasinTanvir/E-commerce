import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import ProductDetailScreen from "./Screen/ProductDetailsScreen/ProductDetailScreen";
import history from "./Shared/history/history";
import CartScreen from "./Screen/CartScreen/CartScreen";
import LoginPage from "./Screen/LogInPage/LoginPage";
import ProfileScreen from "./Screen/ProfileScreen/ProfileScreen";
import Loading from "./Shared/Loading/Loading";
//import SheppingPage from "./Screen/SheepingPage/SheppingPage";
//import PaymentPage from "./Screen/PaymentPage/PaymentPage";
//import PlaceOrder from "./Screen/PlaceOrder/PlaceOrder";
//import CheckOutOrder from "./Screen/CheckOutOrder/CheckOutOrder";
//import UserListPage from "./Screen/UserListPage/UserListPage";
//import AdminEdit from "./Screen/AdminEdit/AdminEdit";
//import AdminProductList from "./Screen/AdminProductList/AdminProductList";
//import AdminProductEdit from "./Screen/AdminEditProduct/AdminProductEdit";
//import AdminCreateProduct from "./Screen/AdminCreateProduct/AdminCreateProduct";
//import AdminAllOrder from "./Screen/AdminOrdersAll/AdminAllOrder";

const SheppingPage = React.lazy(() =>
  import("./Screen/SheepingPage/SheppingPage")
);
const PaymentPage = React.lazy(() =>
  import("./Screen/PaymentPage/PaymentPage")
);
const PlaceOrder = React.lazy(() => import("./Screen/PlaceOrder/PlaceOrder"));
const CheckOutOrder = React.lazy(() =>
  import("./Screen/CheckOutOrder/CheckOutOrder")
);
const UserListPage = React.lazy(() =>
  import("./Screen/UserListPage/UserListPage")
);
const AdminEdit = React.lazy(() => import("./Screen/AdminEdit/AdminEdit"));
const AdminProductList = React.lazy(() =>
  import("./Screen/AdminProductList/AdminProductList")
);
const AdminProductEdit = React.lazy(() =>
  import("./Screen/AdminEditProduct/AdminProductEdit")
);
const AdminCreateProduct = React.lazy(() =>
  import("./Screen/AdminCreateProduct/AdminCreateProduct")
);
const AdminAllOrder = React.lazy(() =>
  import("./Screen/AdminOrdersAll/AdminAllOrder")
);

const App = () => {
  const LoginData = useSelector((state) => state.userLogin);
  const { userInfo } = LoginData;

  let user;
  if (userInfo) {
    user = (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<SheppingPage />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin/userlist" element={<UserListPage />} />
        <Route path="/admin/productlist" element={<AdminProductList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<AdminProductList />}
        />
        <Route path="/admin/orderlist" element={<AdminAllOrder />} />
        <Route path="/admin/createproduct" element={<AdminCreateProduct />} />
        <Route path="/admin/user/:id/edit" element={<AdminEdit />} />
        <Route path="/admin/product/:id/edit" element={<AdminProductEdit />} />
        <Route path="/order/:id" element={<CheckOutOrder />} />
        <Route path="/product/:id" element={<ProductDetailScreen />} />
        <Route path="/cart">
          <Route path=":id" element={<CartScreen />} />
          <Route path="" element={<CartScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    user = (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="/product/:id" element={<ProductDetailScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart">
          <Route path=":id" element={<CartScreen />} />
          <Route path="" element={<CartScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Router history={history}>
      <Header />
      <Container>
        <main className="py-3">
          <Suspense fallback={<Loading />}>{user}</Suspense>
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
