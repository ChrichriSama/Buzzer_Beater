const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    username: { type: String, required: true },
    content:  { type: String, required: true },
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title:    { type: String, required: true, maxlength: 150 },
    content:  { type: String, required: true },
    replies:  [ReplySchema],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
