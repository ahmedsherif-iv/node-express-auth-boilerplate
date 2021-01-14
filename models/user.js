const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    picture: {
        type: String,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;