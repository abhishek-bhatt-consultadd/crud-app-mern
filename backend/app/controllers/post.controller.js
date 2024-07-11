
const db  = require("../models");
const Posts = db.posts;

exports.createPost = async(req,res)=>{
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    })

    try{
        const postsave = await post.save();
        res.json(postsave)
    }catch(error){
        console.log(error);
    }
}

exports.getPost = async(req,res) => {
    try{
        const posts = await Posts.find()
        res.json(posts)
    } catch(err){
        res.send("Error", error)
    }
}


exports.findSinglePost = async(req,res) => {
    try{
        const posts = await Posts.findById(req.params.id)
        res.json(posts)
    } catch(error){
        res.send("Error", error)
    }
}


exports.updatePost = async(req, res)=>{
    const posts = await Posts.findById(req.params.id)
    const postsUpdate = await Posts.findOneAndUpdate({id: req.params.id}, { $set: req.body}, {new:true})
    res.json(postsUpdate)
}

exports.deletePost = async(req,res) => {
    try{
        const postsDelete = await Posts.findByIdAndRemove(req.params.id)
        res.json(postsDelete)
    }catch(err){
        console.log(error)
    }
}