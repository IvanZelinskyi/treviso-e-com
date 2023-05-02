import React from "react";
import Checkout from "../views/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripeKey } from "../config";
const stripePromise = loadStripe(stripeKey);
const Stripe = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  );
};

export default Stripe;
