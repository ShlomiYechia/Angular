const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title :{
       type: String,
       required: true,
       min : 2
    },
    description: {
        type: String,
        required: true,
    },
    priority:{
        type: String,
    }
});
module.exports = mongoose.model("Task",schema);