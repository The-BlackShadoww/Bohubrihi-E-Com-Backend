const _ = require("lodash");
const { Comments } = require("../models/comments");

module.exports.postComment = async (req, res) => {
    console.log("This is req body ==>", req.body);
    const userId = req.user._id;
    console.log("This is User id ==>", userId);
    const userComment = _.pick(req.body, ["comment", "productId"]);
    userComment["user"] = userId;
    let comment = new Comments(userComment);
    await comment.save();
};

module.exports.getComment = async (req, res) => {};
