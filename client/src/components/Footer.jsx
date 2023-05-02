import { CiTwitter, CiInstagram, CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";
const Footer = ({
  setSearch,
  setDropCats,
  setCart,
  setModal,
  isLoggedIn,
  setLogoutWindow,
}) => {
  return (
    <footer>
      <div className="footer-header noSelect">
        <h1>TREVISO</h1>
      </div>
      <div className="footer-content">
        <div className="footer-social">
          <div className="footer-icon-container">
            <CiInstagram className="footer-icon" />
          </div>
          <div className="footer-icon-container">
            <CiTwitter className="footer-icon" />
          </div>
          <div className="footer-icon-container">
            <CiYoutube className="footer-icon" />
          </div>
        </div>
        <div className="footer-links">
          <ul>
            <h6>Navigate</h6>
            <li onClick={() => setCart(true)}>Cart</li>
            <li onClick={() => setSearch(true)}>Search</li>
            <li onClick={() => setDropCats(true)}>Catalog</li>
          </ul>
          <ul>
            <h6>Official</h6>
            <li>FAQ</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Contact</li>
          </ul>
          <ul>
            <h6>Account</h6>
            {!isLoggedIn ? (
              <>
                <li onClick={() => setModal({ display: true, tab: "login" })}>
                  Login
                </li>
                <li
                  onClick={() => setModal({ display: true, tab: "register" })}
                >
                  Register
                </li>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <li> My Account </li>
                </Link>
                <li onClick={() => setLogoutWindow(true)}>Logout</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
