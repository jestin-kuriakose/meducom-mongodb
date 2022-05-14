const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: false, unique: true},
    lastname: { type: String, required: false, unique: true},
    city: { type: String, required: false, unique: true},
    speciality: { type: String, required: false, unique: true},
    username: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isAdmin: { type: Boolean, default: false},
    img: {type: String}
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema) 