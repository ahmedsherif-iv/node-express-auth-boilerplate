const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB config
const db = config.mongo.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('mongodb connected'));

// routes
const { authRoutes } = require('./routes').apiRoutes;
app.use('/api', authRoutes);

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));