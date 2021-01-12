const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    // console.log('user', user);
    return user;
}

const registerUser = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('email already exists');
    }

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);

    const newUser = await User.create(userData);
    return newUser;
}


const loginWithEmailandPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            user.password = undefined;
            return user;
        }
        throw new Error('incorrect password');
    }
    throw new Error('email not registered');
}

const registerWithGoogle = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        return user;
    }
    const newUser = await User.create(userData);
    return newUser;
}

module.exports = {
    getUserById,
    registerUser,
    loginWithEmailandPassword,
    registerWithGoogle,
}