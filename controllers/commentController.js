const _ = require("lodash");
const { Comments } = require("../models/comments");

module.exports.postComment = async (req, res) => {
    console.log(req);
    console.log(req.body);
    const userId = req.user._id;
    // const productId= req
    const userComment = _.pick(req.body, "comment");
};

module.exports.getComment = async (req, res) => {};
