// const { Schema, model } = require("mongoose");

// module.exports.Comments = model(
//     "comments",
//     Schema({
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: "User",
//         },
//         productId: String,
//         comment: String,
//     })
// );

// Comments.index({ user: 1 });


//!---------------------------------------

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productId: String,
    comment: String,
});

// Remove the unique: true option
commentSchema.index({ user: 1 });

module.exports.Comments = model("Comment", commentSchema);