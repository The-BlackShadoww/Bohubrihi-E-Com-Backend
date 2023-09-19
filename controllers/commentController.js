const _ = require("lodash");
const { Comments } = require("../models/comments");

module.exports.postComment = async (req, res) => {
    console.log("This is req body ==>",req.body);
    const userId = req.user._id;
    console.log("This is User id ==>",userId);
    // const productId= req
    const userComment = _.pick(req.body, "comment");
};

module.exports.getComment = async (req, res) => {};
