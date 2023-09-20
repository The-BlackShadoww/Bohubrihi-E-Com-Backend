// const { Schema, model } = require("mongoose");

// const commentSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//     },
//     productId: String,
//     comment: String,
// });

// // Remove the unique: true option
// // commentSchema.index({ user: 1 });

// module.exports.Comments = model("comments", commentSchema);

//!=========================================================

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    user: String,
    productId: String,
    comment: String,
});

module.exports.Comments = model("comments", commentSchema);
