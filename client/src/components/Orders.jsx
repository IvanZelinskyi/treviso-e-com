import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
const Orders = ({ email, setSelectedOrder, setOpenOrder }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${URL}/users/${email}`);
        if (response.data.ok) {
          setOrders(response.data.data.orders);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [email]);
  return (
    orders &&
    [...orders].reverse().map((order) => {
      const initialItems = [];
      order.items.forEach((orderItem) => initialItems.push(orderItem));
      const total = order.items.reduce((a, c) => a + c.price * c.quantity, 0);
      const dateStr = order.date;
      const dateObj = new Date(dateStr);
      const formattedDate = dateObj.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return (
        <div className="order-container" key={order._id}>
          {/* IMAGE PRODUCTS CONTAINER  */}
          {/* ORDER DETAILS  */}
          <div className="order-information">
            <div className="order-info">
              <div>
                <p>Order number</p>
                <p>{order._id}</p>
              </div>
              <div>
                <p>Date</p>
                <p>{formattedDate}</p>
              </div>
              <div>
                <p>Total</p>
                <p>{Intl.NumberFormat("en-US").format(total)} $</p>
              </div>
              <div>
                <p>Status</p>
                <p style={{ color: "orange" }}>On the way</p>
              </div>
            </div>
          </div>
          {/* Shipping details  */}
          <div className="order-shippingDetails">
            <p>
              {order.shippingAddress.country}
              <br />
              {order.shippingAddress.city}
              <br />
              {order.shippingAddress.street} {order.shippingAddress.houseNumber}
              , {order.shippingAddress.postalCode}
            </p>
            <p style={{ textDecoration: "underline" }}>
              {" "}
              {order.shippingAddress.phoneNumber}
            </p>
          </div>
          {/* PRODCUTS  */}
          <div className="order-products">
            <p>
              {initialItems.length}{" "}
              {`item${initialItems.length > 1 ? "s" : ""}`}
            </p>
            {initialItems.map((item) => {
              return (
                <p key={item._id}>
                  {item.name} <span> x{item.quantity}</span>
                </p>
              );
            })}
          </div>
          {/* BUTTON  */}
          <div className="order-container-button">
            <button
              className="singleProd-addtocart"
              onClick={() => {
                setSelectedOrder(order);
                setOpenOrder(true);
              }}
            >
              <span>View order</span>
            </button>
          </div>
        </div>
      );
    })
  );
};

export default Orders;
