const { Schema, model } = require("mongoose");

module.exports.Comments = model(
    "comments",
    Schema({
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        productId: String,
        comment: String,
    })
);
