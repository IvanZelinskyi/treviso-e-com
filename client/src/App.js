import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar";
import { useRecoilState } from "recoil";
import Footer from "./components/Footer";
import Subcategory from "./views/Subcategory";
import SingleProduct from "./views/SingleProduct";
import ScrollToTop from "./hooks/ScrollToTop";
import LoginModal from "./components/LoginModal";
import PaymentError from "./components/PaymentError";
import PaymentSuccess from "./components/PaymentSuccess";
import CartNotification from "./components/CartNotification";
import PageError from "./components/PageError";
import OrderInvoice from "./components/OrderInvoice";
import MyProfile from "./views/MyProfile";
import Stripe from "./components/Stripe";
import { AnimatePresence } from "framer-motion";
import BrandList from "./views/BrandList";
import * as jose from "jose";
import {
  categories as categoriesAtom,
  products as productsAtom,
  users as usersAtom,
  subCategories as subCategoriesAtom,
} from "./atoms";
import axios from "axios";
import { URL } from "./config";
function App() {
  const [products, setProducts] = useRecoilState(productsAtom);
  const [users, setUsers] = useRecoilState(usersAtom);
  const [categories, setCategories] = useRecoilState(categoriesAtom);
  const [paymentError, setPaymentError] = useState("");
  const [openOrder, setOpenOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [subCategories, setSubcategories] = useRecoilState(subCategoriesAtom);
  const [modal, setModal] = useState({ display: false, tab: "login" });
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ firstname: "", email: "" });
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [shippingData, setShippingData] = useState({
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [logoutWindow, setLogoutWindow] = useState(false);
  const [cart, setCart] = useState(false);
  const [search, setSearch] = useState(false);
  const [dropCats, setDropCats] = useState(false);
  const [cartNotification, setCartNotification] = useState({
    display: false,
    action: "",
    product: null,
  });
  // CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);
  useEffect(() => {
    if (cartNotification.display) {
      const timer = setTimeout(() => {
        setCartNotification({ action: null, product: null, display: false });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [
    cartNotification.display,
    cartNotification.product,
    cartNotification.action,
  ]);
  const addToCart = (product) => {
    const exist = cartData.find((ele) => ele._id === product._id);
    if (exist) {
      setCartData(
        cartData.map((ele) =>
          ele._id === product._id ? { ...exist, qty: exist.qty + 1 } : ele
        )
      );
    } else {
      setCartData([...cartData, { ...product, qty: 1 }]);
    }
  };
  const removeFromCart = (product) => {
    let cartCopy = [...cartData];
    let result = [];
    cartCopy.forEach((prod) => prod._id !== product._id && result.push(prod));
    return setCartData(result);
  };
  const countCartItems = (cartData) => {
    let totalItems = 0;
    for (let i = 0; i < cartData.length; i++) {
      const item = cartData[i];
      totalItems += item.qty;
    }
    return totalItems;
  };
  const cartSummary = countCartItems(cartData);

  // AUTHENTICATION
  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setToken(JSON.parse(localStorage.getItem("token")));
          setIsLoggedIn(false);
        }
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${URL}/users/verify_token`);
        if (response.data.ok) {
          let decodedToken = jose.decodeJwt(token);
          try {
            const res = await axios.get(
              `${URL}/users/${decodedToken.userEmail}`
            );
            setUser({
              firstname: res.data.data.firstname,
              email: res.data.data.email,
            });
            login(token);
          } catch (err) {
            console.log(err);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);
  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser({ firstname: "", email: "" });
  };

  // db requests
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${URL}/products/all`);
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUsers = async () => {
      try {
        const res = await axios.get(`${URL}/users/all`);
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getCategories = async () => {
      try {
        const res = await axios.get(`${URL}/categories/all`);
        setCategories(res.data.categories);
      } catch (err) {
        console.log(err);
      }
    };
    const getSubCategories = async () => {
      try {
        const res = await axios.get(`${URL}/subcategories/all`);
        setSubcategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
    getSubCategories();
    getUsers();
    getProducts();
  }, []);
  return (
    <Router>
      {cartNotification.display && <CartNotification data={cartNotification} />}
      {modal.display && (
        <LoginModal
          modal={modal}
          setModal={setModal}
          isLoggedIn={isLoggedIn}
          login={login}
          setUser={setUser}
        />
      )}
      {openOrder && (
        <OrderInvoice order={selectedOrder} setOpenOrder={setOpenOrder} />
      )}
      <Navbar
        setModal={setModal}
        logout={logout}
        isLoggedIn={isLoggedIn}
        cartData={cartData}
        setCartData={setCartData}
        addToCart={addToCart}
        search={search}
        setSearch={setSearch}
        setDropCats={setDropCats}
        dropCats={dropCats}
        setCart={setCart}
        cart={cart}
        logoutWindow={logoutWindow}
        setLogoutWindow={setLogoutWindow}
        cartSummary={cartSummary}
      />
      <ScrollToTop />
      <Routes>
        <Route
          path="/profile"
          element={
            <MyProfile
              user={user}
              isLoggedIn={isLoggedIn}
              setModal={setModal}
              setLogoutWindow={setLogoutWindow}
              logout={logout}
              openOrder={openOrder}
              setOpenOrder={setOpenOrder}
              setSelectedOrder={setSelectedOrder}
            />
          }
        />
        <Route render={() => <PageError />} />
        <Route
          exact
          path="/"
          element={
            <Home
              products={products}
              cartData={cartData}
              addToCart={addToCart}
              setCartNotification={setCartNotification}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/:subcategory"
          element={
            <Subcategory
              addToCart={addToCart}
              cartData={cartData}
              removeFromCart={removeFromCart}
              setCartNotification={setCartNotification}
            />
          }
        />
        <Route
          path="/product/:name"
          element={
            <SingleProduct
              cartData={cartData}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              setCartNotification={setCartNotification}
            />
          }
        />
        <Route
          path="/brand/:brandName"
          element={
            <BrandList
              addToCart={addToCart}
              cartData={cartData}
              removeFromCart={removeFromCart}
              setCartNotification={setCartNotification}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Stripe
              cartData={cartData}
              isLoggedIn={isLoggedIn}
              setModal={setModal}
              user={user}
              setShippingData={setShippingData}
              shippingData={shippingData}
              cartSummary={cartSummary}
              paymentError={paymentError}
              setPaymentError={setPaymentError}
            />
          }
        />
        <Route
          path="payment/success"
          element={
            <PaymentSuccess
              cartData={cartData}
              user={user}
              setCartData={setCartData}
              userName={user.firstname}
            />
          }
        />
        <Route
          path="/payment/error"
          element={<PaymentError paymentError={paymentError} />}
        />
      </Routes>
      <Footer
        setSearch={setSearch}
        setDropCats={setDropCats}
        setCart={setCart}
        isLoggedIn={isLoggedIn}
        login={login}
        logout={logout}
        setModal={setModal}
        setLogoutWindow={setLogoutWindow}
      />
    </Router>
  );
}

export default App;
