const _ = require("lodash");
const { Comments } = require("../models/comments");

module.exports.postComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const userComment = _.pick(req.body, ["comment", "productId"]);
        userComment["user"] = userId;

        let newComment = new Comments(userComment);
        await newComment.save();
        return res.status(200).send("Comment successfully posted");
    } catch (err) {
        console.log(err);
    }
};



//! For getting comments.
module.exports.getComment = async (req, res) => {};
