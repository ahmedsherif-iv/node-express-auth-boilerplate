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
        // required: [true, 'Please enter a password'],
        // minlength: [6, 'Minimum password length is 6 characters'],
    },
    picture: {
        type: String,
    },
    googleId: {
        type: String
    },
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;