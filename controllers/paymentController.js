const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;

const { CartItem } = require("../models/cartItem");
const { Profile } = require("../models/profile");
const { Order } = require("../models/order");
const { Payment } = require("../models/payment");
const path = require("path");

//! Request a session
//! Payment process
//! Receive IPN
//! Create an order

module.exports.ipn = async (req, res) => {
    // console.log(req.body);
    const payment = new Payment(req.body);
    const tran_id = payment["tran_id"];
    if (payment["status"] === "VALID") {
        const order = await Order.updateOne(
            { transaction_id: tran_id },
            { status: "Complete" }
        );
        await CartItem.deleteMany(order.cartItems);
    } else {
        await Order.deleteOne({ transaction_id: tran_id });
    }

    await payment.save();

    return res.status(200).send("IPN");
};

module.exports.initPayment = async (req, res) => {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId });
    //todo profile
    const profile = await Profile.findOne({ user: userId });
    const { address1, address2, city, state, postcode, country, phone } =
        profile;

    const total_amount = cartItems
        .map((item) => item.count * item.price)
        .reduce((a, b) => a + b, 0);

    const total_item = cartItems
        .map((item) => item.count)
        .reduce((a, b) => a + b, 0);

    const tran_id =
        "_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

    //todo init payment session
    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
    );

    //! Set the urls
    payment.setUrls({
        success:
            "https://bohubrihi-e-com-backend-app.onrender.com/api/payment/success",
        fail: "yoursite.com/fail",
        cancel: "yoursite.com/cancel",
        ipn: "https://bohubrihi-e-com-backend-app.onrender.com/api/payment/ipn",
    });

    //! Set order details
    payment.setOrderInfo({
        total_amount: total_amount,
        currency: "BDT",
        tran_id: tran_id,
        emi_option: 0,
    });

    //! Set customer info
    payment.setCusInfo({
        name: req.user.name,
        email: req.user.email,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        phone: phone,
        fax: phone,
    });

    //! Set shipping info
    payment.setShippingInfo({
        method: "Courier",
        num_item: total_item,
        name: req.user.name,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
    });

    //! Set Product Profile
    payment.setProductInfo({
        product_name: "Bohubrihi E-com Products",
        product_category: "General",
        product_profile: "general",
    });

    response = await payment.paymentInit();

    let order = new Order({
        cartItems: cartItems,
        user: userId,
        transaction_id: tran_id,
        address: profile,
    });

    if (response.status === "SUCCESS") {
        order.sessionKey = response["sessionkey"];
        await order.save();
    }
    return res.status(200).send(response);
};

module.exports.paymentSuccess = async (req, res) => {
    res.sendFile(path.join(__basedir + "/public/success.html"));
};

//todo ============================ try populate =========================================

// const SSLCommerz = require("ssl-commerz-node");
// const PaymentSession = SSLCommerz.PaymentSession;
// const { CartItem } = require("../models/cartItem");
// const { Profile } = require("../models/profile");
// const { Order } = require("../models/order");
// const { Payment } = require("../models/payment");
// const path = require("path");

// //! Request a session
// //! Payment process
// //! Receive IPN
// //! Create an order

// module.exports.ipn = async (req, res) => {
//     // console.log(req.body);
//     const payment = new Payment(req.body);
//     const tran_id = payment["tran_id"];
//     if (payment["status"] === "VALID") {
//         const order = await Order.updateOne(
//             { transaction_id: tran_id },
//             { status: "Complete" }
//         );
//         await CartItem.deleteMany(order.cartItems);
//     } else {
//         await Order.deleteOne({ transaction_id: tran_id });
//     }

//     await payment.save();

//     return res.status(200).send("IPN");
// };

// module.exports.initPayment = async (req, res) => {
//     const userId = req.user._id;
//     //! Changes made !!
//     const cartItems = await CartItem.find({ user: userId }).populate("product");
//     //todo profile
//     const profile = await Profile.findOne({ user: userId });
//     const { address1, address2, city, state, postcode, country, phone } =
//         profile;

//     const total_amount = cartItems
//         .map((item) => item.count * item.price)
//         .reduce((a, b) => a + b, 0);

//     const total_item = cartItems
//         .map((item) => item.count)
//         .reduce((a, b) => a + b, 0);

//     const tran_id =
//         "_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

//     //todo init payment session
//     const payment = new PaymentSession(
//         true,
//         process.env.SSLCOMMERZ_STORE_ID,
//         process.env.SSLCOMMERZ_STORE_PASSWORD
//     );

//     //! Set the urls
//     payment.setUrls({
//         success:
//             "https://bohubrihi-e-com-backend-app.onrender.com/api/payment/success",
//         fail: "yoursite.com/fail",
//         cancel: "yoursite.com/cancel",
//         ipn: "https://bohubrihi-e-com-backend-app.onrender.com/api/payment/ipn",
//     });

//     //! Set order details
//     payment.setOrderInfo({
//         total_amount: total_amount,
//         currency: "BDT",
//         tran_id: tran_id,
//         emi_option: 0,
//     });

//     //! Set customer info
//     payment.setCusInfo({
//         name: req.user.name,
//         email: req.user.email,
//         add1: address1,
//         add2: address2,
//         city: city,
//         state: state,
//         postcode: postcode,
//         country: country,
//         phone: phone,
//         fax: phone,
//     });

//     //! Set shipping info
//     payment.setShippingInfo({
//         method: "Courier",
//         num_item: total_item,
//         name: req.user.name,
//         add1: address1,
//         add2: address2,
//         city: city,
//         state: state,
//         postcode: postcode,
//         country: country,
//     });

//     //! Set Product Profile
//     payment.setProductInfo({
//         product_name: "Bohubrihi E-com Products",
//         product_category: "General",
//         product_profile: "general",
//     });

//     try {
//         response = await payment.paymentInit();
//     } catch (err) {
//         console.log(err);
//     }

//     let order = new Order({
//         cartItems: cartItems.map((item) => ({
//             productId: item.product._id,
//             name: item.product.name,
//             price: item.price,
//             count: item.count,
//             user: item.user,
//         })),
//         user: userId,
//         transaction_id: tran_id,
//         address: profile,
//     });

//     if (response.status === "SUCCESS") {
//         order.sessionKey = response["sessionkey"];
//         await order.save();
//     }
//     try {
//         return res.status(200).send(response);
//     } catch (err) {
//         console.log(err);
//     }
// };

// module.exports.paymentSuccess = async (req, res) => {
//     res.sendFile(path.join(__basedir + "/public/success.html"));
// };
