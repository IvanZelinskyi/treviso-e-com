import { useState } from "react";
import { VscClose } from "react-icons/vsc";
const OrderInvoice = ({ order, setOpenOrder }) => {
  const [isInside, setIsInside] = useState(false);
  const insideHandler = () => {
    return !isInside && setOpenOrder(false);
  };
  const dateStr = order.date;
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const renderSubTotal = order
    ? Intl.NumberFormat("en-US").format(
        order.items.reduce((a, c) => a + c.price * c.quantity, 0)
      )
    : [];
  const total = order.items.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice =
    order.items.reduce((a, c) => a + c.price * c.quantity, 0) > 40 ? 0 : 40;
  const renderTotal =
    shippingPrice === 0
      ? Intl.NumberFormat("en-US").format(total)
      : Intl.NumberFormat("en-US").format(total + 40);
  return (
    order && (
      <main
        className="overlay fadeIn"
        onClick={insideHandler}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="order-window"
          onMouseEnter={() => setIsInside(true)}
          onMouseLeave={() => setIsInside(false)}
        >
          <VscClose
            className="order-window-close"
            onClick={() => setOpenOrder(false)}
          />
          <h1>
            <span>
              <strong>Order:</strong> {order._id}
            </span>
          </h1>
          <h2>
            <strong>Status:</strong>{" "}
            <span style={{ color: "orange" }}>On the way</span>
          </h2>
          <div className="order-window-content-wrapper">
            <div className="order-window-items">
              <h3>Items</h3>
              {order.items.map((item) => {
                return (
                  <div className="order-window-item" key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>
                      <strong>
                        {Intl.NumberFormat("en-US").format(item.price)} $
                      </strong>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="order-window-details">
              <p>
                <strong>Date:</strong> <span>{formattedDate}</span>
              </p>
              <p>
                <strong>Country:</strong>{" "}
                <span>{order.shippingAddress.country}</span>
              </p>
              <p>
                <strong>City:</strong> <span>{order.shippingAddress.city}</span>
              </p>
              <p>
                <strong>Shipping address:</strong>{" "}
                <span>
                  {order.shippingAddress.street}{" "}
                  {order.shippingAddress.houseNumber}
                </span>
              </p>
              <p>
                <strong>Postal code:</strong>{" "}
                <span>{order.shippingAddress.postalCode}</span>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <span>{order.shippingAddress.phoneNumber}</span>
              </p>
              <div className="order-window-total">
                <p>
                  Subtotal: <span>{renderSubTotal} $</span>
                </p>
                <p>
                  Shipping: <span>{shippingPrice} $</span>
                </p>
                <p>
                  Total: <span>{renderTotal} $</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default OrderInvoice;
