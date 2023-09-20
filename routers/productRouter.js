const router = require("express").Router();
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    getPhoto,
    filterProducts,
    getOrderedProducts,
    getProductsSortedByPrice,
} = require("../controllers/productController");

router.route("/").post([authorize, admin], createProduct).get(getProducts);

router
    .route("/:id")
    .get(getProductById)
    .put([authorize, admin], updateProductById);

router.route("/photo/:id").get(getPhoto);

router.route("/filter").post(filterProducts);

//todo ==> Modifications

router.route("/order").post(getOrderedProducts);
router.route("/price").post(getProductsSortedByPrice);

module.exports = router;
