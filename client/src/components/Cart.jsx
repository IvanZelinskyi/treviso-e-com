import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { RiAddCircleFill } from "react-icons/ri";
import { AiFillMinusCircle } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  setCart,
  cartData,
  setCartData,
  addToCart,
  cartSummary,
  isLoggedIn,
  setModal,
}) => {
  const [isInside, setIsInside] = useState(false);
  const { width } = useWindowDimensions();
  const insideHandler = () => {
    return !isInside && setCart(false);
  };
  const totalPrice = Intl.NumberFormat("en-US").format(
    cartData.reduce((a, c) => a + c.price * c.qty, 0)
  );
  const shippingDiff = 40 - totalPrice;

  const decreaseCartQty = (product) => {
    const exist = cartData.find((ele) => ele._id === product._id);
    if (exist.qty === 1) {
      setCartData(cartData.filter((ele) => ele._id !== product._id));
    } else {
      setCartData(
        cartData.map((ele) =>
          ele._id === product._id ? { ...exist, qty: exist.qty - 1 } : ele
        )
      );
    }
  };
  const removeItem = (item) => {
    let cartCopy = [...cartData];
    cartCopy.splice(item, 1);
    setCartData(cartCopy);
  };
  return (
    <div className={cart ? "cart-overlay fadeIn" : ""} onClick={insideHandler}>
      <div
        className={cart ? "cart active" : "cart"}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
        onTouchStart={() => setIsInside(true)}
      >
        <div className="cart-header">
          {width < 901 && (
            <VscClose className="cart-close" onClick={() => setCart(false)} />
          )}
          <p>
            {cartData.length < 1
              ? "Your cart is currently empty"
              : `${cartSummary} item${cartSummary > 1 ? "s" : ""}`}
          </p>
          <div
            className={
              cartData.length > 0
                ? "cart-progressBar active"
                : "cart-progressBar"
            }
          ></div>
          <p>
            {totalPrice < 40
              ? `Add ${shippingDiff}$ for FREE shipping`
              : `Free standard shipping unlocked`}
          </p>
        </div>
        <div className="cart-products">
          {cartData.map((prod, idx) => {
            const total = Intl.NumberFormat("en-US").format(
              prod.qty * prod.price
            );
            return (
              <div key={prod._id} className="cart-product">
                <HiOutlineTrash
                  className="cart-trashbin"
                  onClick={() => removeItem(idx)}
                />
                <Link
                  to={`/product/${prod.name}`}
                  onClick={() => setCart(false)}
                >
                  <img src={prod.image} alt={prod.name} className="noSelect" />
                </Link>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Link
                      to={`/product/${prod.name}`}
                      onClick={() => setCart(false)}
                    >
                      <p>{prod.name}</p>
                    </Link>
                    <div className="cart-increase noSelect">
                      <p onClick={() => decreaseCartQty(prod)}>
                        <AiFillMinusCircle />
                      </p>
                      <span>{prod.qty}</span>
                      <p onClick={() => addToCart(prod)}>
                        <RiAddCircleFill />
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      marginLeft: "20px",
                    }}
                  >
                    {total} $
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-footer">
          <div className="cart-footer-total">
            <p>Subtotal</p>
            <p>{totalPrice} $</p>
          </div>
          <div className="cart-footer-taxes">
            <p>*shipping, taxes, and discounts calculated at checkout.</p>
          </div>
          <Link
            to={isLoggedIn && cartData.length > 0 ? `/checkout` : null}
            onClick={() => {
              !isLoggedIn && setModal({ display: true, tab: "login" });
              setCart(false);
            }}
          >
            <button>
              <span>Checkout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
