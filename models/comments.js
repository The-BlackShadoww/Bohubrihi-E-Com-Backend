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

//!========================== original ===============================

// const { Schema, model } = require("mongoose");

// const commentSchema = new Schema({
//     user: String,
//     productId: String,
//     comment: String,
// });

// module.exports.Comments = model("comments", commentSchema);

//!=========================================================

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: String,
    comment: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Comments = mongoose.model("comment", commentSchema);

module.exports = Comments;
