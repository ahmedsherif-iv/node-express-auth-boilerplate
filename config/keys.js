const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    mongo: {
        MONGO_URI: process.env.MONGO_URI,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    },
    jwt: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
        appID: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
    },
};