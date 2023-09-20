const { Order } = require("../models/order");

module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).send(orders);
    } catch (err) {
        console.log(err);
    }
};
