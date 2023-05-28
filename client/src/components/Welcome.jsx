import React from "react";
import { motion } from "framer-motion";
const Welcome = ({ setInitialMessage }) => {
  return (
    <motion.div
      className="initialMessage"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      duration={0.5}
    >
      <h1>Welcome to Treviso!</h1>
      <h2 style={{ textDecoration: "underline" }}>
        It could take some time to load the data
      </h2>
      <h2>
        In order to complete the purchase
        <br /> use the following card number:
      </h2>
      <h3>4242 4242 4242 4242</h3>
      <button onClick={() => setInitialMessage(false)}>Understood</button>
    </motion.div>
  );
};
export default Welcome;
