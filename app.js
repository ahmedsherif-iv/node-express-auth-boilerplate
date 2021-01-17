const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config');
const { validationMiddleware } = require('./middlewares');

const { userRoutes, authRoutes } = require('./routes');

// set up passport
require('./config/passport-config');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// set static folders
app.use(express.static('public'));
app.use(express.static('templates'));

// initialize passport
app.use(passport.initialize());

// DB config
const db = config.mongo.MONGO_URI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => console.log('mongodb connected'));

// set up routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// handle celebrate errors
app.use(validationMiddleware.handleValidationError);

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));