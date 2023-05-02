const Users = require("../models/usersModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config({ path: "./.env" });
const jwt_secret = process.env.JWT_SECRET;

class usersController {
  async findAll(req, res) {
    try {
      const find = await Users.find({});
      res.send({ ok: true, data: find });
    } catch (err) {
      res.send({ err });
    }
  }
  async findOne(req, res) {
    let { user } = req.params;
    try {
      const find = await Users.findOne({ email: user });
      res.send({ ok: true, data: find });
    } catch (err) {
      res.send({ err });
    }
  }

  async register(req, res) {
    const { email, firstname, password, password2 } = req.body;
    if (!email || !password || !password2 || !firstname)
      return res.json({ ok: false, message: "All fields required" });
    if (password !== password2)
      return res.json({ ok: false, message: "Passwords must match" });
    if (!validator.isEmail(email))
      return res.json({ ok: false, message: "Invalid credentials" });
    try {
      const user = await Users.findOne({ email });
      if (user) return res.json({ ok: false, message: "Invalid credentials" });
      const hash = await argon2.hash(password);
      console.log("hash ==>", hash);
      const newUser = {
        email,
        password: hash,
        firstname,
      };
      await Users.create(newUser);
      res.json({ ok: true, message: "Successfully registered" });
    } catch (error) {
      res.json({ ok: false, error });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ ok: false, message: "All field are required" });
    if (!validator.isEmail(email))
      return res.json({ ok: false, message: "invalid data provided" });
    try {
      const user = await Users.findOne({ email });
      if (!user)
        return res.json({ ok: false, message: "invalid data provided" });
      const match = await argon2.verify(user.password, password);
      if (match) {
        const token = jwt.sign({ userEmail: user.email }, jwt_secret, {
          expiresIn: "1h",
        });
        res.json({ ok: true, message: "Welcome back", token, email });
      } else return res.json({ ok: false, message: "invalid data provided" });
    } catch (error) {
      res.json({ ok: false, error });
    }
  }
  verify_token = (req, res) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    jwt.verify(token, jwt_secret, (err, succ) => {
      err
        ? res.json({ ok: false, message: "something went wrong" })
        : res.json({ ok: true, succ });
    });
  };

  async addUser(req, res) {
    let { email, password, firstname } = req.body;
    try {
      const add = await Users.create({ email, password, firstname });
      res.send({ ok: true, data: `User ${email} created successfully!` });
    } catch (err) {
      res.send({ err });
    }
  }

  async updateUser(req, res) {
    let {
      old_email,
      old_password,
      old_firstname,
      new_email,
      new_password,
      new_firstname,
    } = req.body;
    try {
      const findUser = await Users.findOne({ email: old_email });
      if (findUser) {
        const update = await Users.updateOne(
          {
            email: old_email,
            password: old_password,
            firstname: old_firstname,
          },
          { email: new_email, password: new_password, firstname: new_firstname }
        );
        res.send({ ok: true, data: `User ${old_email} updated successfully!` });
      } else if (!findUser) {
        res.send({ ok: false, data: `User ${old_email} doesn't exist` });
      }
    } catch (err) {
      res.send({ err });
    }
  }

  async deleteUser(req, res) {
    let { email } = req.body;
    try {
      const remove = await Users.deleteOne({ email });
      res.send({
        ok: true,
        data: `User ${email} has been removed from data base!`,
      });
    } catch (err) {
      res.send({ err });
    }
  }

  async addOrder(req, res) {
    const userEmail = req.params.user;
    const order = req.body;

    try {
      const user = await Users.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.orders.push(order);
      await user.save();
      console.log("Order added successfully:", user);
      res.status(201).json({ message: "Order added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new usersController();
