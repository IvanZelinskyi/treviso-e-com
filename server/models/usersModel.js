const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    orders: [
      {
        date: { type: String },
        shippingAddress: {
          country: { type: String, required: true },
          city: { type: String, required: true },
          street: { type: String, required: true },
          houseNumber: { type: String, required: true },
          postalCode: { type: String, required: true },
          phoneNumber: { type: String, required: true },
        },
        items: [
          {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String },
          },
        ],
      },
    ],
  },
  { strictQuery: false }
);
module.exports = mongoose.model("users", userSchema);
