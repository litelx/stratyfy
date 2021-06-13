const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        default: 'basic',
        enum: ['basic', 'manager']
    },

    token: {
        type: String
    }
});

const User = mongoose.model('user', schema);

module.exports = User;