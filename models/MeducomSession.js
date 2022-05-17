const mongoose = require('mongoose')

const MeduSessionSchema = new mongoose.Schema({
    location: { type: String, required: false, unique: false},
    speaker: { type: String, required: false, unique: false},
    status: { type: String, required: false, unique: false},
    email: { type: String, required: false, unique: true},
    url: { type: String, required: false, unique: true},
}, { timestamps: true });

module.exports = mongoose.model("MeducomSession", MeduSessionSchema) 