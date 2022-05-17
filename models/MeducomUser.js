const mongoose = require('mongoose')

const MeduUserSchema = new mongoose.Schema({
    firstname: { type: String, required: false, unique: true},
    lastname: { type: String, required: false, unique: true},
    city: { type: String, required: false, unique: false},
    speciality: { type: String, required: false, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    isAdmin: { type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model("MeducomUser", MeduUserSchema) 