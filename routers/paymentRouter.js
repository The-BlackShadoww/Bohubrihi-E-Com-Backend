const router = require("express").Router();
// const {
//     initPayment,
//     ipn,
//     paymentSuccess,
// } = require("../controllers/newPayment.mjs");
import {
    initPayment,
    ipn,
    paymentSuccess,
} from "../controllers/newPayment.mjs";

const authorize = require("../middlewares/authorize");

router.route("/").get(authorize, initPayment);
router.route("/ipn").post(ipn);
router.route("/success").post(paymentSuccess);

module.exports = router;

//todo ========== original ===========
// const router = require("express").Router();
// const {
//     initPayment,
//     ipn,
//     paymentSuccess,
// } = require("../controllers/paymentController");
// const authorize = require("../middlewares/authorize");

// router.route("/").get(authorize, initPayment);
// router.route("/ipn").post(ipn);
// router.route("/success").post(paymentSuccess);

// module.exports = router;
