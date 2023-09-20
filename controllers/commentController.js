const _ = require("lodash");
const Comments = require("../models/comments");

module.exports.postComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const userComment = _.pick(req.body, ["comment", "productId"]);
        userComment["user"] = userId;
        console.log("this is userComment: ", userComment);

        let newComment = new Comments(userComment);
        await newComment.save();
        return res.status(200).send("Comment received");
    } catch (err) {
        console.log(err);
    }
};

module.exports.getComment = async (req, res) => {};
