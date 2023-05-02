import React from "react";
import { useNavigate } from "react-router-dom";
const PaymentError = ({ paymentError }) => {
  let navigate = useNavigate();

  if (!paymentError) {
    navigate("/");
  }
  return (
    <main className="payment-error-main">
      <h2>Error: {paymentError}</h2>
      <h1>
        Sorry, there was an error processing your payment.
        <br /> Please try again later or contact our customer support team for
        assistance.
      </h1>
    </main>
  );
};

export default PaymentError;
