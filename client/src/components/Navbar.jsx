import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// components
import useScrollPosition from "../hooks/useScrollPosition";
import Search from "../components/Search";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import DropCats from "../components/DropCats";
import LogoutConfirmation from "../components/LogoutConfirmation";
import Cart from "../components/Cart";
// icons
import { CgMenuGridO } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
const Navbar = ({
  setModal,
  isLoggedIn,
  logout,
  cartData,
  setCartData,
  addToCart,
  setSearch,
  search,
  dropCats,
  setDropCats,
  cart,
  setCart,
  logoutWindow,
  setLogoutWindow,
  cartSummary,
}) => {
  let location = useLocation();
  const position = useScrollPosition();
  const { width } = useWindowDimensions();

  return (
    <>
      {logoutWindow && (
        <LogoutConfirmation setLogoutWindow={setLogoutWindow} logout={logout} />
      )}
      <DropCats
        setDropCats={setDropCats}
        dropCats={dropCats}
        setModal={setModal}
        logout={logout}
        isLoggedIn={isLoggedIn}
        logoutWindow={logoutWindow}
        setLogoutWindow={setLogoutWindow}
      />
      <Cart
        cart={cart}
        setCart={setCart}
        cartData={cartData}
        setCartData={setCartData}
        addToCart={addToCart}
        cartSummary={cartSummary}
        isLoggedIn={isLoggedIn}
        setModal={setModal}
      />
      <Search search={search} setSearch={setSearch} />
      <div className="nav-wrapper noSelect">
        <header
          className={position > 70 || location.pathname !== "/" ? "active" : ""}
        >
          <div className="nav-left">
            <CgMenuGridO
              className="nav-icon"
              onClick={() => setDropCats(!dropCats)}
            />
            {width > 768 && (
              <Link to="/">
                <p>Home</p>
              </Link>
            )}
          </div>
          <Link to="/">
            <h1>Treviso</h1>
          </Link>
          <div className="nav-right">
            <CiSearch className="nav-icon" onClick={() => setSearch(true)} />
            {width > 768 && (
              <>
                {isLoggedIn ? (
                  <Link to="/profile" className="nav-icon fadeIn">
                    <RxPerson />
                  </Link>
                ) : (
                  <RxPerson
                    className="nav-icon fadeIn"
                    onClick={() => setModal({ display: true, tab: "login" })}
                  />
                )}
              </>
            )}
            <div className="nav-cart">
              <BsCart2 className="nav-icon" onClick={() => setCart(!cart)} />
              <p
                style={
                  cartData.length > 0 ? { opacity: "1" } : { opacity: "0" }
                }
                className={
                  position > 70 || location.pathname !== "/"
                    ? "nav-cart-counter active"
                    : "nav-cart-counter"
                }
                onClick={() => setCart(!cart)}
              >
                {cartSummary}
              </p>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
