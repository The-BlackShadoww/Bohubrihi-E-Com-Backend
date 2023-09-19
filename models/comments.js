const { Schema, model } = require("mongoose");

module.exports.Comments = model(
    "comments",
    Schema({
        user: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: true,
            ref: "User",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        comment: String,
    })
);
