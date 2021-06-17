const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const User = require('./models/user.model');
const authMiddleware = require('./middleware/auth.middleware');

require('dotenv').config();

mongoose
    .connect(`mongodb://${process.env.DATABASE_URL}:27017/stratyfy`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Database connection has been established');
    })
    .catch(e => {
        console.log(e);
    });

let manager = new User({
    username: 'admin',
    password: 'password',
    role: 'manager',
    token: ''
});

manager.save();

let user = new User({
    username: 'user',
    password: 'password',
    role: 'basic',
    token: ''
});

user.save();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', authMiddleware.isAuthenticated);
app.use('/', routes);

app.listen(process.env.PORT || 8081);