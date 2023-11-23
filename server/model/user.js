const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        minLength : 6,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("User",schema);