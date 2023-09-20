const { Schema, model } = require("mongoose");

module.exports.Comments = model(
    "comments",
    Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        productId: String,
        comment: String,
    })
);

Comments.index({ user: 1 });
