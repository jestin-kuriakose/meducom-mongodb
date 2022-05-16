const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    title: { type: String, required: false, unique: true},
    heading: { type: String, required: false, unique: true},
    questions: { type: Array, required: false},
    comments: { type: Array},
}, { timestamps: true });

module.exports = mongoose.model("Forum", ForumSchema) 