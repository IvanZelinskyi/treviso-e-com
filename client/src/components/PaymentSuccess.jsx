import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ cartData, setCartData, userName }) => {
  const [user, setUser] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const [purchaseItems, setPurchaseItems] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const parsedShippingData = JSON.parse(localStorage.getItem("shippingData"));
    setShippingData(parsedShippingData);
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    setUser(parsedUser);
    let temp = [...cartData];
    setPurchaseItems(temp);
    setCartData([]);
  }, []);
  const currDate = new Date();
  useEffect(() => {
    const addOrder = async () => {
      // debugger;
      try {
        const response = await axios.post(`${URL}/users/${user.email}/orders`, {
          date: currDate.toISOString(),
          shippingAddress: {
            country: shippingData.country,
            city: shippingData.city,
            street: shippingData.street,
            houseNumber: shippingData.houseNumber,
            postalCode: shippingData.postalCode,
            phoneNumber: shippingData.phoneNumber,
          },
          items: purchaseItems.map(({ name, qty, price, image }) => ({
            name,
            quantity: qty,
            price,
            image,
          })),
        });
        localStorage.removeItem("shippingData");
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    };
    if (
      user?.email &&
      shippingData &&
      purchaseItems.every((item) => item.image)
    ) {
      addOrder();
    }
  }, [user, shippingData, purchaseItems]);
  const subTotal = purchaseItems
    ? purchaseItems.reduce((a, c) => a + c.price * c.qty, 0)
    : 0;

  const shippingPrice = purchaseItems && subTotal <= 40 ? 40 : 0;
  if (!shippingData) {
    navigate("/");
  }
  return (
    <main className="paymentSuccess-main">
      <div className="invoice-container">
        <div className="invoice-container-inner">
          {/* HEADER  */}
          <div className="invoice-container-header">
            <h6>Treviso</h6>
            <h5 style={{ fontWeight: "500" }}>Your order is confirmed!</h5>
            <strong>Hello, {userName}</strong>
            <p>your order has been confirmed but will never be shipped</p>
          </div>
          {/* SHIPPING DETAILS  */}
          <div className="invoice-shipping-details">
            <div>
              <p>Country</p>
              <strong>{shippingData?.country}</strong>
            </div>
            <div>
              <p>City</p>
              <strong>{shippingData?.city}</strong>
            </div>

            <div>
              <p>Street</p>
              <strong>{shippingData?.street}</strong>
            </div>
            <div>
              <p>House number</p>
              <strong>{shippingData?.houseNumber}</strong>
            </div>
            <div>
              <p>Postal code</p>
              <strong>{shippingData?.postalCode}</strong>
            </div>
            <div>
              <p>Phone number</p>
              <strong>{shippingData?.phoneNumber}</strong>
            </div>
          </div>
          {/* ITEMS  */}
          <div className="invoice-items">
            {purchaseItems.map((prod) => {
              const qtyPrice = prod.price * prod.qty;
              return (
                <div className="invoice-item" key={prod._id}>
                  <div>
                    <img src={prod.image} />
                    <div>
                      <p>{prod.name}</p>
                      <p>x{prod.qty}</p>
                    </div>
                  </div>
                  <strong className="invoice-item-qtyPrice">
                    {Intl.NumberFormat("en-US").format(qtyPrice)} $
                  </strong>
                </div>
              );
            })}
          </div>
          {/* TOTAL  */}
          <div className="invoice-total">
            <div>
              <p>Subtotal</p>
              <p>{subTotal} $</p>
            </div>
            <div>
              <p>Shipping fee</p>
              <p>{shippingPrice} $</p>
            </div>
            <div>
              <strong>Total</strong>
              <strong>
                {subTotal
                  ? Intl.NumberFormat("en-US").format(
                      subTotal > 40 ? subTotal : subTotal + 40
                    )
                  : 0}{" "}
                $
              </strong>
            </div>
          </div>
          <div className="invoice-footer">
            <div>
              <strong>Thanks for shopping</strong>
            </div>
            <div>
              <strong>Need help?</strong>
              <p>Call - 0000000000</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
