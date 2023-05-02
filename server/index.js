const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  categoriesRoute = require("./routes/categoriesRoute"),
  subCategoriesRoute = require("./routes/subCategoriesRoute"),
  productsRoute = require("./routes/productsRoute"),
  brandsRoute = require("./routes/brandsRoute"),
  usersRoute = require("./routes/usersRoute"),
  cors = require("cors"),
  path = require("path");
require("dotenv").config({ path: "./.env" });

let port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// mongoose.set('debug', true)
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../client/build")));

async function connecting() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to the DB");
  } catch (error) {
    console.log(
      "ERROR: Seems like your DB is not running, please start it up !!!"
    );
  }
}
connecting();
app.use("/payment", require("./routes/paymentRoute.js"));
app.use("/categories", categoriesRoute);
app.use("/subcategories", subCategoriesRoute);
app.use("/products", productsRoute);
app.use("/brands", brandsRoute);
app.use("/users", usersRoute);
app.get("/*", function (req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
