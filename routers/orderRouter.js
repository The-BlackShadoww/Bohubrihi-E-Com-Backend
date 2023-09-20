const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const { getOrders } = require("../controllers/orderController");

router.route("/").get(authorize, getOrders);

module.exports = router;
