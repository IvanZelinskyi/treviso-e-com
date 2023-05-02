import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";

const Checkout = ({
  cartData,
  isLoggedIn,
  setModal,
  user,
  setShippingData,
  shippingData,
  paymentError,
  setPaymentError,
}) => {
  const totalPrice = Intl.NumberFormat("en-US").format(
    cartData.reduce((a, c) => a + c.price * c.qty, 0)
  );
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const stripe = useStripe();

  const redirect = (sessionId) => {
    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(function (result) {});
  };

  // create session
  const createCheckoutSession = async () => {
    let products = cartData.map((prod) => ({
      name: prod.name,
      images: [prod.image],
      quantity: prod.qty,
      amount: prod.price,
    }));
    try {
      const response = await axios.post(
        `${URL}/payment/create-checkout-session`,
        { products }
      );
      return response.data.ok
        ? (localStorage.setItem(
            "sessionId",
            JSON.stringify(response.data.sessionId)
          ),
          redirect(response.data.sessionId))
        : navigate("/payment/error");
    } catch (error) {
      setPaymentError(error);
      navigate("/payment/error");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShippingData({
      ...shippingData,
      [event.target.name]: event.target.value,
    });
    if (shippingData) {
      localStorage.setItem("shippingData", JSON.stringify(shippingData));
      localStorage.setItem("user", JSON.stringify(user));
      createCheckoutSession();
    } else {
      alert("Please fill all input fields");
    }
  };
  return (
    <main className="checkout-main fadeIn">
      {/* PRODUCTS  */}
      <div className="checkout-products">
        <h1>Items</h1>
        <ul className="checkout-products-inner">
          {cartData?.map((prod) => {
            const totalItem = Intl.NumberFormat("en-US").format(
              prod.price * prod.qty
            );
            return (
              <li key={prod._id} className="checkout-product">
                <div className="checkout-product-wrapper">
                  <img src={prod.image} alt={prod.name} />
                  <div>
                    <p>{prod.name}</p>
                    <p>{totalItem} $</p>
                  </div>
                </div>
                <p>x{prod.qty}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* SHIPPING  */}
      <div className="shippingDetails">
        <h1>Shipping details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">
            Country <span>*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />

          <label htmlFor="city">
            City <span>*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />

          <label htmlFor="street">
            Street <span>*</span>
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={shippingData.street}
            onChange={handleInputChange}
            placeholder="Street"
            required
          />

          <label htmlFor="houseNumber">
            House Number <span>*</span>
          </label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={shippingData.houseNumber}
            placeholder="House number"
            onChange={handleInputChange}
            required
          />

          <label htmlFor="postalCode">
            Postal Code <span>*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal code"
            name="postalCode"
            value={shippingData.postalCode}
            onChange={handleInputChange}
            pattern="[0-9]+"
            required
          />

          <label htmlFor="phoneNumber">
            Phone Number <span>*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone number"
            value={shippingData.phoneNumber}
            onChange={handleInputChange}
            pattern="[0-9]+"
            required
          />

          <h2>
            Total <span>{totalPrice} $</span>
          </h2>
          <button type="submit">
            <span>Pay</span>
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
