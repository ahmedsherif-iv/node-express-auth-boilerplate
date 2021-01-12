const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config');

require('./config/passport-config');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// initialize passport
app.use(passport.initialize());
// app.use(passport.session());

// DB config
const db = config.mongo.MONGO_URI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => console.log('mongodb connected'));

// set up routes
const { authRoutes } = require('./routes/api');
app.use('/api/auth', authRoutes);

////// jwt test
const { Item } = require('./models');

app.get('/api/items', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user);
    Item.find().then((items) => res.send(items));
})
/////////////////

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));