const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/usersController");

router.get("/all", controller.findAll);
router.get("/:user", controller.findOne);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/verify_token", controller.verify_token);
router.post("/add", controller.addUser);
router.post("/update", controller.updateUser);
router.post("/delete", controller.deleteUser);
router.post("/:user/orders", controller.addOrder);

module.exports = router;
