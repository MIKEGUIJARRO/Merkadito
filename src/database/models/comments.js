const mongoose = require("mongoose");

//Mongoose schema creation
const commentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    comment: String,
});

//Mongoose model config
let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
