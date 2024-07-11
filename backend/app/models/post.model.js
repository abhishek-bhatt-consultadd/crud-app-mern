const mongoose = require("mongoose");

const Post  =  mongoose.model(
    "Posts",
    new mongoose.Schema({
        title:{
            type:"String",
            required: true
        },
        description:{
            type:"String",
            required: true
        }
    })
);



module.exports = Post;